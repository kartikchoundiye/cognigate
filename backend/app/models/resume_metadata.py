from sqlalchemy import (
    Column,
    Integer,
    JSON,
    ForeignKey,
)

from app.database.base import Base

class ResumeMetadata(Base):

    __tablename__ = "resume_metadata"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id", ondelete="CASCADE")
    )

    resume_id = Column(
        Integer,
        ForeignKey("resumes.id", ondelete="CASCADE")
    )

    metadata_json = Column(
        JSON
    )
