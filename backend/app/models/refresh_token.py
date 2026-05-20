from sqlalchemy import Column, Integer, String, DateTime, ForeignKey
from datetime import datetime, timedelta
from app.database.base import Base
from typing import Any


class RefreshToken(Base):
    __tablename__ = "refresh_tokens"

# Commented by agent, reason: Add static type annotations (Any) to resolve Pyright/Pylance Column vs built-in types warnings on attribute access and comparisons
#     id = Column(Integer, primary_key=True, index=True)
#     user_email = Column(String, index=True)
#     token = Column(String, unique=True)
#     expires_at = Column(DateTime)
# 
#     def is_expired(self):
#         return datetime.utcnow() > self.expires_at
# End commented by agent

    id: Any = Column(Integer, primary_key=True, index=True)  # type: ignore
    user_email: Any = Column(String, index=True)  # type: ignore
    token: Any = Column(String, unique=True)  # type: ignore
    expires_at: Any = Column(DateTime)  # type: ignore

    def is_expired(self) -> bool:
        return datetime.utcnow() > self.expires_at
