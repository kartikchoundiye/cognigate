from sqlalchemy import Column, Integer, String, Boolean
from app.database.base import Base
from typing import Any

class User(Base):
    __tablename__ = "users"

# Commented by agent, reason: Add static type annotations (Any) to resolve Pyright/Pylance Column vs built-in types warnings on attribute access
#     id = Column(Integer, primary_key=True, index=True)
#     email = Column(String, unique=True, index=True)
#     username = Column(String, nullable=False)
#     password = Column(String)
#     is_active = Column(Boolean, default=True)
# End commented by agent
    id: Any = Column(Integer, primary_key=True, index=True)  # type: ignore
    email: Any = Column(String, unique=True, index=True)  # type: ignore
    username: Any = Column(String, nullable=False)  # type: ignore
    password: Any = Column(String)  # type: ignore
    is_active: Any = Column(Boolean, default=True)  # type: ignore