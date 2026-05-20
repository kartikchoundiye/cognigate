from sqlalchemy import Column, Integer, String, DateTime, Boolean
from app.database.base import Base
from datetime import datetime
from typing import Any


class OTP(Base):
    __tablename__ = "otp"

# Commented by agent, reason: Add static type annotations to SQLAlchemy columns for proper IDE IntelliSense and to fix Pyright warnings
#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, index=True)
#     otp_code = Column(String)
#     created_at = Column(DateTime, default=datetime.utcnow)
#     expires_at = Column(DateTime)
#     is_verified = Column(Boolean, default=False)
# End commented by agent
# Commented by agent, reason: Update annotations from specific types to Any to resolve Pyright ColumnElement assignment/comparison issues
#     id: int = Column(Integer, primary_key=True, index=True)  # type: ignore
#     email: str = Column(String, index=True)  # type: ignore
#     otp_code: str = Column(String)  # type: ignore
#     created_at: datetime = Column(DateTime, default=datetime.utcnow)  # type: ignore
#     expires_at: datetime = Column(DateTime)  # type: ignore
#     is_verified: bool = Column(Boolean, default=False)  # type: ignore
# End commented by agent
    id: Any = Column(Integer, primary_key=True, index=True)  # type: ignore
    email: Any = Column(String, index=True)  # type: ignore
    otp_code: Any = Column(String)  # type: ignore
    created_at: Any = Column(DateTime, default=datetime.utcnow)  # type: ignore
    expires_at: Any = Column(DateTime)  # type: ignore
    is_verified: Any = Column(Boolean, default=False)  # type: ignore
