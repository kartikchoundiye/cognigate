from sqlalchemy import Column, Integer, String, Boolean
from app.database.base import Base
from typing import Any
from sqlalchemy.orm import relationship

class User(Base):
    __tablename__ = "users"

    id: Any = Column(Integer, primary_key=True, index=True)
    email: Any = Column(String, unique=True, index=True)
    username: Any = Column(String, nullable=False)
    password: Any = Column(String)
    is_active: Any = Column(Boolean, default=True)

    resumes = relationship(
        "Resume",
        back_populates="user",
        cascade="all, delete"
    )