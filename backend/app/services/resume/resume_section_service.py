import re


SECTION_PATTERNS = {

    "skills": [
        "skills",
        "technical skills",
        "core competencies"
    ],

    "projects": [
        "projects",
        "academic projects"
    ],

    "experience": [
        "experience",
        "work experience",
        "professional experience"
    ],

    "education": [
        "education",
        "academic background"
    ],

    "certifications": [
        "certifications",
        "certificates"
    ]
}


def detect_resume_sections(text: str):

    sections = {}

    lower_text = text.lower()

    for section_name, keywords in SECTION_PATTERNS.items():

        for keyword in keywords:

            match = re.search(
                keyword,
                lower_text
            )

            if match:

                sections[section_name] = True

                break

    return sections
