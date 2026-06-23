from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timedelta
from app.database.base import Base
from typing import Any


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id: Any = Column(Integer, primary_key=True, index=True)
    user_email: Any = Column(String, index=True)
    token: Any = Column(String, unique=True)
    expires_at: Any = Column(DateTime)

    def is_expired(self) -> bool:
        return datetime.utcnow() > self.expires_at
