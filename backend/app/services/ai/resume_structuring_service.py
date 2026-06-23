import json

from langchain_groq import ChatGroq

from app.config.settings import settings


llm = ChatGroq(

    api_key=settings.GROQ_API_KEY,

    model="llama-3.3-70b-versatile",

    temperature=0.2,
)


def structure_resume(
    resume_text: str
):

    prompt = f"""
You are an expert resume analyzer.

Analyze the resume and return ONLY valid JSON.

Extract:

1. skills
2. projects
3. experience
4. education
5. achievements

JSON format:

{{
    "skills": [],
    "projects": [],
    "experience": [],
    "education": [],
    "achievements": []
}}

Resume:

{resume_text}
"""

    response = llm.invoke(
        prompt
    )

    try:

        content = response.content

        content = content.replace(
            "```json",
            ""
        )

        content = content.replace(
            "```",
            ""
        )

        return json.loads(
            content
        )

    except Exception:

        return {
            "skills": [],
            "projects": [],
            "experience": [],
            "education": [],
            "achievements": []
        }
