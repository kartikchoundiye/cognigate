from langchain_core.prompts import (
    PromptTemplate
)

from app.services.ai.retrieval_service import (
    retrieve_resume_context
)

from app.services.ai.prompt_service import (
    technical_interviewer_prompt
)

from app.services.ai.groq_service import (
    llm
)

from app.services.resume.resume_profile_service import (
    get_resume_profile
)


def ask_resume_rag(

    resume_id: int,

    query: str,

    db,
):

    profile = get_resume_profile(
        resume_id,
        db
    )

    context = retrieve_resume_context(

        resume_id=resume_id,

        query=query,

    )

    augmented_context = f"""
{context}

Candidate Skills:
{profile.get('skills', [])}

Candidate Projects:
{profile.get('projects', [])}

Candidate Experience:
{profile.get('experience', [])}
"""

    template = PromptTemplate(

        template=
        technical_interviewer_prompt(),

        input_variables=[
            "context",
            "query",
        ]

    )

    prompt = template.format(

        context=augmented_context,

        query=query,

    )

    response = llm.invoke(
        prompt
    )

    return {

        "query": query,

        "context_used": context,

        "response": response.content,

    }