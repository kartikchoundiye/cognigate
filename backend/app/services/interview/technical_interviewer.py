from app.services.resume.resume_profile_service import get_resume_profile
from app.services.interview.question_generator import generate_technical_question

def generate_first_question(
    resume_id,
    db
):
    data = get_resume_profile(
        resume_id,
        db
    )
    
    skills = data.get("skills", [])
    projects = data.get("projects", [])
    
    question = generate_technical_question(
        skills=skills,
        projects=projects,
    )
    
    return question
