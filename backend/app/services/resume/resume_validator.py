from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.models.resume import Resume


def validate_resume_ownership(
    db: Session,
    resume_id: int,
    user_id: int,
):
    """
    Ensure resume belongs to current user.
    """

    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == user_id
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return resume