from app.models.interview_session import InterviewSession
from app.services.interview.technical_interviewer import generate_first_question
from app.services.interview.answer_evaluator import evaluate_answer
from app.services.resume.resume_profile_service import get_resume_profile
from app.services.interview.question_generator import generate_technical_question

def start_session(
    resume_id,
    db,
    user_id
):
    question = generate_first_question(resume_id, db)
    
    session = InterviewSession(
        user_id=user_id,
        resume_id=resume_id,
        round_type="technical",
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

def submit_answer(
    session_id,
    answer,
    db,
    user_id
):
    session = db.query(InterviewSession).filter(InterviewSession.id == session_id).first()
    
    if not session:
        return {"error": "Session not found"}
        
    if session.user_id != user_id:
        return {"error": "Access denied"}
        
    index = session.current_question_index
    question = session.questions[index]
    
    evaluation = evaluate_answer(
        question,
        answer,
    )
    
    profile = get_resume_profile(session.resume_id, db)
    skills = profile.get("skills", [])
    projects = profile.get("projects", [])
    
    history = []
    for i in range(len(session.answers)):
        history.append({
            "question": session.questions[i],
            "answer": session.answers[i]["answer"],
            "evaluation": session.answers[i]["evaluation"]
        })
        
    history.append({
        "question": question,
        "answer": answer,
        "evaluation": evaluation
    })
    
    updated_answers = list(session.answers)
    updated_answers.append({
        "answer": answer,
        "evaluation": evaluation
    })
    session.answers = updated_answers
    session.current_question_index += 1
    
    if session.current_question_index >= 5:
        session.status = "completed"
        db.commit()
        db.refresh(session)
        return {
            "evaluation": evaluation,
            "message": "Interview completed"
        }
        
    next_question = generate_technical_question(
        skills=skills,
        projects=projects,
        history=history
    )
    
    updated_questions = list(session.questions)
    updated_questions.append(next_question)
    session.questions = updated_questions
    
    db.commit()
    db.refresh(session)
    
    return {
        "evaluation": evaluation,
        "next_question": next_question,
    }
