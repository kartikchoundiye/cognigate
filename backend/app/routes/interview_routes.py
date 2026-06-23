from fastapi import (
    APIRouter,
    Depends,
)

from sqlalchemy.orm import Session
from app.models.user import User

from app.utils.dependencies import (
    get_current_user
)

from app.schemas.interview_schema import (
    InterviewQueryRequest
)

from app.services.ai.rag_service import (
    ask_resume_rag
)

from app.services.resume.resume_validator import (
    validate_resume_ownership
)

from app.database.base import SessionLocal

router = APIRouter()


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()

@router.post("/ask")
def ask_ai(

    data: InterviewQueryRequest,

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(
        get_db
    ),

):

    resume = validate_resume_ownership(

        db=db,

        resume_id=data.resume_id,

        user_id=current_user.id,

    )

    response = ask_resume_rag(

        resume_id=resume.id,

        query=data.query,

        db=db,
    )

    return {

        "resume_id": resume.id,

        "resume_title": resume.title,

        "answer": response

    }


from app.schemas.interview_schema import (
    AptitudeStartRequest,
    AptitudeAnswerRequest,
    HRStartRequest,
    HRAnswerRequest,
)
from app.services.interview.aptitude_session_service import (
    start_aptitude_session,
    answer_aptitude_question,
)
from app.services.hr.hr_interview_service import (
    start_hr_session,
    answer_hr_question,
)


@router.post("/aptitude/start")
def start_aptitude(
    data: AptitudeStartRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    # Validate resume ownership like other endpoints
    resume = validate_resume_ownership(
        db=db,
        resume_id=data.resume_id,
        user_id=current_user.id,
    )

    return start_aptitude_session(
        resume_id=resume.id,
        db=db,
        user_id=current_user.id
    )


@router.post("/aptitude/answer")
def answer_aptitude(
    data: AptitudeAnswerRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return answer_aptitude_question(
        session_id=data.session_id,
        answer=data.answer,
        db=db,
        user_id=current_user.id
    )


@router.post("/hr/start")
def start_hr(
    data: HRStartRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    resume = validate_resume_ownership(
        db=db,
        resume_id=data.resume_id,
        user_id=current_user.id,
    )

    return start_hr_session(
        resume_id=resume.id,
        db=db,
        user_id=current_user.id
    )


@router.post("/hr/answer")
def answer_hr(
    data: HRAnswerRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    return answer_hr_question(
        session_id=data.session_id,
        answer=data.answer,
        db=db,
        user_id=current_user.id
    )