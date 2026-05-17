from pydantic import BaseModel, EmailStr, field_validator


class SendOTPRequest(BaseModel):
    email: EmailStr


class VerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str


class RegisterRequest(BaseModel):
    email: EmailStr
    username: str
    password: str
    confirm_password: str

    @field_validator("username")
    def validate_username(cls, v):
        if len(v.strip()) < 3:
            raise ValueError("Username must be at least 3 characters")
        return v

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v


class LoginRequest(BaseModel):
    email: EmailStr
    password: str

    @field_validator("password")
    def validate_password(cls, v):
        if len(v) < 6:
            raise ValueError("Password must be at least 6 characters")
        return v


class LogoutRequest(BaseModel):
    refresh_token: str


class ForgotPasswordSendOTPRequest(BaseModel):
    email: EmailStr


class ForgotPasswordVerifyOTPRequest(BaseModel):
    email: EmailStr
    otp: str


class ForgotPasswordResetRequest(BaseModel):
    email: EmailStr
    new_password: str
    confirm_password: str


class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str
    confirm_password: str


class ChangeUsernameRequest(BaseModel):
    new_username: str


class DeleteAccountRequest(BaseModel):
    password: str
    confirm_text: str
