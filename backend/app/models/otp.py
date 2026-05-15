from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.database.base import Base
from datetime import datetime


class OTP(Base):
    __tablename__ = "otp"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    otp_code = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    expires_at = Column(DateTime)
    is_verified = Column(Boolean, default=False)
