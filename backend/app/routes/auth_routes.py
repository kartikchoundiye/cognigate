from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.base import SessionLocal
from app.schemas.auth_schema import (
    SendOTPRequest,
    VerifyOTPRequest,
    RegisterRequest,
    LoginRequest,
    ForgotPasswordSendOTPRequest,
    ForgotPasswordVerifyOTPRequest,
    ForgotPasswordResetRequest,
    ChangePasswordRequest,
    ChangeUsernameRequest,
    DeleteAccountRequest,
)
from app.services.auth_service import create_otp
from app.models.user import User
from app.models.otp import OTP
from app.models.refresh_token import RefreshToken
from app.utils.jwt_handler import hash_password, verify_password
from app.utils.token import create_access_token, create_refresh_token
from app.utils.dependencies import get_current_user
from datetime import datetime, timedelta
from jose import jwt, JWTError
from app.config.settings import settings

router = APIRouter()


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/send-otp")
def send_otp(data: SendOTPRequest, db: Session = Depends(get_db)):
    if db.query(User).filter(User.email == data.email).first():
        raise HTTPException(status_code=400, detail="Email already exists")

    # otp = create_otp(db, data.email, purpose="Account Registration")
    result = create_otp(db, data.email, purpose="Account Registration")

    if not result["success"]:
        raise HTTPException(status_code=400, detail=result["message"])

    # send email here (optional for now)
    # print("OTP:", result)

    # return {"message": "OTP sent"}
    return {"message": result["message"]}


@router.post("/verify-otp")
def verify_otp(data: VerifyOTPRequest):
    db = SessionLocal()

    otp_obj = db.query(OTP).filter(OTP.email == data.email).first()

    if not otp_obj:
        raise HTTPException(status_code=400, detail="OTP not found")

    if otp_obj.otp_code != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if otp_obj.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")

    # ✅ Mark verified
    otp_obj.is_verified = True
    db.commit()

    return {"message": "OTP verified successfully"}


@router.post("/register")
def register_user(data: RegisterRequest):
    db = SessionLocal()

    # ✅ Check OTP verified
    otp_obj = db.query(OTP).filter(OTP.email == data.email).first()

    if not otp_obj or not otp_obj.is_verified:
        raise HTTPException(status_code=400, detail="OTP not verified")

    # ✅ Check passwords match
    if data.password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    # ✅ Check user exists
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="User already exists")

    # ✅ Create user
    user = User(
        email=data.email, username=data.username, password=hash_password(data.password)
    )

    db.add(user)

    # ✅ Delete OTP after use (important)
    db.delete(otp_obj)

    db.commit()

    return {"message": "User registered successfully"}


@router.post("/login")
def login(data: LoginRequest, db: Session = Depends(get_db)):
    user = db.query(User).filter(User.email == data.email).first()

    if not user or not verify_password(data.password, user.password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    db = SessionLocal()

    access_token = create_access_token({"sub": user.email})
    refresh_token = create_refresh_token({"sub": user.email})

    # Save refresh token
    db_token = RefreshToken(
        user_email=user.email,
        token=refresh_token,
        expires_at=datetime.utcnow() + timedelta(days=7),
    )

    db.add(db_token)
    db.commit()

    return {
        "access_token": access_token,
        "refresh_token": refresh_token,
        "token_type": "bearer",
    }


@router.post("/refresh")
def refresh_token(refresh_token: str):
    db = SessionLocal()

    db_token = (
        db.query(RefreshToken).filter(RefreshToken.token == refresh_token).first()
    )

    if not db_token:
        raise HTTPException(status_code=401, detail="Invalid refresh token")

    if db_token.is_expired():
        db.delete(db_token)
        db.commit()
        raise HTTPException(status_code=401, detail="Token expired")

    # Generate new access token
    new_access_token = create_access_token({"sub": db_token.user_email})

    return {"access_token": new_access_token}


@router.post("/logout")
def logout(refresh_token: str):
    db = SessionLocal()

    db_token = (
        db.query(RefreshToken).filter(RefreshToken.token == refresh_token).first()
    )

    if db_token:
        db.delete(db_token)
        db.commit()

    return {"message": "Logged out successfully"}


# =====================================
# FORGOT PASSWORD - SEND OTP
# =====================================


@router.post("/forgot-password/send-otp")
def forgot_password_send_otp(
    data: ForgotPasswordSendOTPRequest, db: Session = Depends(get_db)
):

    # check user exists
    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(
            status_code=404, detail="User with this email does not exist"
        )

    # create OTP with purpose
    create_otp(db=db, email=data.email, purpose="Account Password Reset")

    return {"message": "Password reset OTP sent successfully"}


# =====================================
# FORGOT PASSWORD - VERIFY OTP
# =====================================
@router.post("/forgot-password/verify-otp")
def forgot_password_verify_otp(
    data: ForgotPasswordVerifyOTPRequest, db: Session = Depends(get_db)
):

    otp_obj = db.query(OTP).filter(OTP.email == data.email).first()

    if not otp_obj:
        raise HTTPException(status_code=404, detail="OTP not found")

    if otp_obj.otp_code != data.otp:
        raise HTTPException(status_code=400, detail="Invalid OTP")

    if otp_obj.expires_at < datetime.utcnow():
        raise HTTPException(status_code=400, detail="OTP expired")

    otp_obj.is_verified = True

    db.commit()

    return {"message": "OTP verified successfully for reset the password"}


# =====================================
# RESET PASSWORD
# =====================================
@router.post("/forgot-password/reset")
def forgot_password_reset(
    data: ForgotPasswordResetRequest, db: Session = Depends(get_db)
):

    if data.new_password != data.confirm_password:
        raise HTTPException(status_code=400, detail="Passwords do not match")

    otp_obj = db.query(OTP).filter(OTP.email == data.email).first()

    if not otp_obj:
        raise HTTPException(status_code=404, detail="OTP verification required")

    if otp_obj.is_verified is not True:
        raise HTTPException(status_code=400, detail="OTP not verified")

    user = db.query(User).filter(User.email == data.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.password = hash_password(data.new_password)

    db.commit()

    # delete otp after reset
    db.delete(otp_obj)
    db.commit()

    return {"message": "Password reset successful"}


# =====================================
# CHANGE PASSWORD
# =====================================


@router.post("/change-password")
def change_password(
    data: ChangePasswordRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    # get fresh user from SAME db session
    user = db.query(User).filter(User.id == current_user.id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # verify current password
    if not verify_password(data.current_password, user.password):
        raise HTTPException(status_code=400, detail="Current password incorrect")

    # verify confirm password
    if data.new_password != data.confirm_password:
        raise HTTPException(
            status_code=400, detail="New password and confirm password do not match"
        )

    # update password
    user.password = hash_password(data.new_password)

    db.commit()
    db.refresh(user)

    return {"message": "Password changed successfully"}


@router.put("/change-username")
def change_username(
    data: ChangeUsernameRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    # get fresh user from same session
    user = db.query(User).filter(User.id == current_user.id).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    user.username = data.new_username

    db.commit()
    db.refresh(user)

    return {
        "message": "Username updated successfully",
        "new_username": user.username,
    }


# =====================================
# DELETE ACCOUNT
# =====================================


@router.delete("/delete-account")
def delete_account(
    data: DeleteAccountRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    # =====================================
    # CONFIRMATION TEXT CHECK
    # =====================================

    if data.confirm_text != "DELETE MY ACCOUNT":
        raise HTTPException(
            status_code=400, detail="Please type exactly: DELETE MY ACCOUNT"
        )

    # =====================================
    # PASSWORD CHECK
    # =====================================

    if not verify_password(data.password, current_user.password):
        raise HTTPException(status_code=400, detail="Incorrect password")

    # =====================================
    # DELETE REFRESH TOKENS
    # =====================================

    db.query(RefreshToken).filter(
        RefreshToken.user_email == current_user.email
    ).delete()

    # =====================================
    # DELETE OTP RECORDS
    # =====================================

    db.query(OTP).filter(OTP.email == current_user.email).delete()

    # =====================================
    # GET USER FROM CURRENT DB SESSION
    # =====================================

    user = db.query(User).filter(User.email == current_user.email).first()

    if not user:
        raise HTTPException(status_code=404, detail="User not found")

    # =====================================
    # DELETE USER
    # =====================================

    db.delete(user)

    db.commit()

    return {"message": "Your account has been permanently deleted"}
