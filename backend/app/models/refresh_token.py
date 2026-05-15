from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timedelta
from app.database.base import Base


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

    id = Column(Integer, primary_key=True, index=True)
    user_email = Column(String, index=True)
    token = Column(String, unique=True)
    expires_at = Column(DateTime)

    def is_expired(self):
        return datetime.utcnow() > self.expires_at
