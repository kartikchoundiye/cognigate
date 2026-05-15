import random
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from app.models.otp import OTP
from app.services.email_service import send_otp_email
from app.utils.email_validator import validate_email_address


def generate_otp():
    return str(random.randint(100000, 999999))


# def create_otp(db: Session, email: str, purpose: str = "register"):
#     otp_code = generate_otp()
#     expires_at = datetime.utcnow() + timedelta(minutes=10)

#     db.query(OTP).filter(OTP.email == email).delete()

#     otp = OTP(email=email, otp_code=otp_code, expires_at=expires_at)
#     db.add(otp)
#     db.commit()

#     send_otp_email(email, otp_code, purpose)

#     return otp_code


def create_otp(db: Session, email: str, purpose: str = "register"):

    # =====================================
    # VALIDATE EMAIL
    # =====================================

    is_valid, validated_email = validate_email_address(email)

    if not is_valid:

        return {"success": False, "message": validated_email}

    email = validated_email

    # =====================================
    # GENERATE OTP
    # =====================================

    otp_code = generate_otp()

    expires_at = datetime.utcnow() + timedelta(minutes=10)

    # =====================================
    # TRY SENDING EMAIL FIRST
    # =====================================

    email_sent = send_otp_email(email, otp_code, purpose)

    if not email_sent:

        return {
            "success": False,
            "message": "Unable to send OTP . Please check your email address .",
        }

    # =====================================
    # DELETE OLD OTP
    # =====================================

    db.query(OTP).filter(OTP.email == email).delete()

    # =====================================
    # SAVE NEW OTP
    # =====================================

    otp = OTP(
        email=email,
        otp_code=otp_code,
        expires_at=expires_at,
    )

    db.add(otp)

    db.commit()

    return {"success": True, "message": "OTP sent successfully"}
