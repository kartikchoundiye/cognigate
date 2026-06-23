from app.services.ai.groq_service import llm

def evaluate_hr_answer(
    question,
    answer
):
    prompt = f"""
You are an HR interviewer.

Question:
{question}

Candidate Answer:
{answer}

Give:

1. Score out of 10
2. Strengths
3. Improvements

Short response.
"""

    response = llm.invoke(prompt)

    return response.content
