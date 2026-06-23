from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.database.base import Base
from datetime import datetime
from typing import Any


class OTP(Base):
    __tablename__ = "otp"

    id: Any = Column(Integer, primary_key=True, index=True)
    email: Any = Column(String, index=True)
    otp_code: Any = Column(String)
    created_at: Any = Column(DateTime, default=datetime.utcnow)
    expires_at: Any = Column(DateTime)
    is_verified: Any = Column(Boolean, default=False)
