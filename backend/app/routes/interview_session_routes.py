from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database.base import SessionLocal
from app.schemas.interview_session_schema import StartInterviewRequest, AnswerRequest
from app.services.interview.interview_session_service import start_session, submit_answer
from app.utils.dependencies import get_current_user
from app.models.user import User
from app.models.interview_session import InterviewSession
from app.services.resume.resume_validator import validate_resume_ownership

router = APIRouter()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/start")
def start_interview(
    data: StartInterviewRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    validate_resume_ownership(
        db,
        data.resume_id,
        current_user.id
    )
    return start_session(data.resume_id, db, current_user.id)

@router.post("/answer")
def answer_question(
    data: AnswerRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    result = submit_answer(data.session_id, data.answer, db, current_user.id)
    
    if "error" in result:
        if result["error"] == "Session not found":
            raise HTTPException(status_code=404, detail=result["error"])
        if result["error"] == "Access denied":
            raise HTTPException(status_code=403, detail=result["error"])
        raise HTTPException(status_code=400, detail=result["error"])
        
    return result

@router.get("/sessions")
def get_interview_sessions(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    sessions = db.query(InterviewSession).filter(InterviewSession.user_id == current_user.id).all()
    
    return [
        {
            "id": session.id,
            "round": session.round_type,
            "status": session.status,
            "created_at": session.created_at
        }
        for session in sessions
    ]
