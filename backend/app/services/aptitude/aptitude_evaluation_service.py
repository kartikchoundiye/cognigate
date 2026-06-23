from app.services.ai.groq_service import llm

def evaluate_aptitude_answer(question: str, answer: str) -> str:
    prompt = f"""
Question:
{question}

Candidate Answer:
{answer}

Evaluate:
1. Correctness
2. Explanation
3. Score out of 10

Return short feedback.
"""
    response = llm.invoke(prompt)
    return response.content
