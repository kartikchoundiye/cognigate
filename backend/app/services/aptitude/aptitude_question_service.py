from app.services.ai.groq_service import llm
import random

def generate_aptitude_question(previous_questions: list[str] = None) -> str:
    categories = ["Quantitative Aptitude", "Logical Reasoning", "Analytical Thinking", "Data Interpretation", "Pattern Recognition"]
    random_category = random.choice(categories)
    
    avoid_text = ""
    if previous_questions and len(previous_questions) > 0:
        avoid_text = "IMPORTANT: Do NOT generate any of these previous questions or anything similar:\n" + "\n".join(f"- {q}" for q in previous_questions) + "\n\n"

    prompt = f"""
Generate ONE completely unique aptitude interview question.
Focus on this category: {random_category}

{avoid_text}
Return only the question text. Do not include the answer, the category, or any conversational text.
"""
    response = llm.invoke(prompt)
    return response.content.strip()
