from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.interview_session import InterviewSession
from app.services.hr.hr_question_generator import generate_hr_questions
from app.services.hr.hr_evaluator import evaluate_hr_answer

def start_hr_session(
    resume_id: int,
    db: Session,
    user_id: int
):
    questions = generate_hr_questions()

    session = InterviewSession(
        user_id=user_id,
        resume_id=resume_id,
        round_type="hr",
        questions=questions,
        answers=[],
        current_question_index=0,
        status="active"
    )

    db.add(session)
    db.commit()
    db.refresh(session)

    return {
        "session_id": session.id,
        "question": questions[0],
        "question_number": 1,
        "total_questions": len(questions)
    }

def answer_hr_question(
    session_id: int,
    answer: str,
    db: Session,
    user_id: int
):
    session = db.query(InterviewSession).filter(
        InterviewSession.id == session_id,
        InterviewSession.user_id == user_id
    ).first()

    if not session:
        raise HTTPException(
            status_code=404,
            detail="Session not found"
        )

    if session.status == "completed":
        raise HTTPException(
            status_code=400,
            detail="Session is already completed"
        )

    current_index = session.current_question_index

    if current_index >= len(session.questions):
        session.status = "completed"
        db.commit()
        db.refresh(session)
        raise HTTPException(
            status_code=400,
            detail="Session is already completed"
        )

    question = session.questions[current_index]
    evaluation = evaluate_hr_answer(question, answer)

    # Convert to list copy to trigger SQLAlchemy JSON mutability tracking
    answers = list(session.answers or [])
    answers.append({
        "question": question,
        "answer": answer,
        "evaluation": evaluation
    })
    session.answers = answers
    session.current_question_index += 1
    db.commit()
    db.refresh(session)

    next_index = session.current_question_index

    if next_index >= len(session.questions):
        session.status = "completed"
        db.commit()
        db.refresh(session)
        return {
            "message": "HR interview completed",
            "evaluation": evaluation,
            "question_number": next_index
        }

    return {
        "evaluation": evaluation,
        "next_question": session.questions[next_index],
        "question_number": next_index + 1
    }
