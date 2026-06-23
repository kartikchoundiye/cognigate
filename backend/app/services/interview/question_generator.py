from app.services.ai.groq_service import llm

def generate_technical_question(
    skills,
    projects,
    history=None
):
    if history is None:
        history = []
        
    history_text = "\n".join([f"Q: {h['question']}\nA: {h['answer']}" for h in history])

    prompt = f"""
You are a senior software engineering interviewer.

Candidate Skills:

{skills}

Candidate Projects:

{projects}

Previous Conversation History:
{history_text if history else "No previous questions asked."}

Generate ONE NEW technical interview question.

Requirements:

- Medium difficulty
- Resume based
- Practical
- Only output the question text
- Do NOT repeat any question from the previous history

"""
    response = llm.invoke(prompt)
    return response.content
