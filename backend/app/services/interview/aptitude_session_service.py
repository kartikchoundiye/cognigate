from sqlalchemy.orm import Session
from app.models.interview_session import InterviewSession
from app.services.aptitude.aptitude_question_service import generate_aptitude_question
from app.services.aptitude.aptitude_evaluation_service import evaluate_aptitude_answer

def start_aptitude_session(resume_id: int, db: Session, user_id: int):
    question = generate_aptitude_question()
    
    session = InterviewSession(
        user_id=user_id,
        resume_id=resume_id,
        round_type="aptitude",
        questions=[question],
        answers=[],
        current_question_index=0,
        status="active"
    )
    
    db.add(session)
    db.commit()
    db.refresh(session)
    
    return {
        "session_id": session.id,
        "question": question,
    }

def answer_aptitude_question(session_id: int, answer: str, db: Session, user_id: int):
    session = db.query(InterviewSession).filter(InterviewSession.id == session_id).first()
    
    if not session:
        return {"error": "Session not found"}
        
    if session.user_id != user_id:
        return {"error": "Access denied"}
        
    if session.status == "completed":
        return {"error": "Session is already completed"}
        
    index = session.current_question_index
    question = session.questions[index]
    
    feedback = evaluate_aptitude_answer(question, answer)
    
    updated_answers = list(session.answers)
    updated_answers.append({
        "answer": answer,
        "evaluation": feedback
    })
    session.answers = updated_answers
    session.current_question_index += 1
    
    if session.current_question_index >= 5:
        session.status = "completed"
        db.commit()
        db.refresh(session)
        return {
            "evaluation": feedback,
            "message": "Aptitude round completed",
            "question_number": session.current_question_index
        }
    
    next_question = generate_aptitude_question(previous_questions=list(session.questions))
    
    updated_questions = list(session.questions)
    updated_questions.append(next_question)
    session.questions = updated_questions
    
    db.commit()
    db.refresh(session)
    
    return {
        "evaluation": feedback,
        "next_question": next_question,
        "question_number": session.current_question_index + 1
    }
