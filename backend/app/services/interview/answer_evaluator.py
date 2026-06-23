from app.services.ai.groq_service import llm

def evaluate_answer(
    question,
    answer,
):
    prompt = f"""
You are an interview evaluator.

Question:

{question}

Candidate Answer:

{answer}

Evaluate:

1. correctness
2. technical depth
3. communication

Give:

score: 0-10

feedback:

"""
    response = llm.invoke(prompt)
    return response.content
