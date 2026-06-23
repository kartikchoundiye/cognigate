from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.database.base import SessionLocal
from app.services.resume.resume_profile_service import get_resume_profile
from app.utils.dependencies import get_current_user
from app.models.user import User
from app.services.resume.resume_validator import validate_resume_ownership

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.get("/profile/{resume_id}")
def get_metadata(
    resume_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):

    validate_resume_ownership(
        db,
        resume_id,
        current_user.id
    )

    profile = get_resume_profile(
        resume_id,
        db
    )

    return profile
