from app.services.resume.resume_skill_service import (
    extract_skills
)

from app.services.resume.resume_section_service import (
    detect_resume_sections
)


def build_resume_metadata(
    resume_text: str
):

    skills = extract_skills(
        resume_text
    )

    sections = detect_resume_sections(
        resume_text
    )

    return {

        "skills": skills,

        "sections": sections

    }
