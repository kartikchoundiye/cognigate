from app.services.ai.groq_service import llm

def generate_hr_questions():
    prompt = """
Generate exactly 5 HR interview questions.

Rules:
- Professional HR round
- One question per line
- No numbering
- No explanations
"""

    try:
        response = llm.invoke(prompt)
        questions = [
            q.strip()
            for q in response.content.split("\n")
            if q.strip()
        ]
    except Exception:
        questions = []

    # Clean up numbering if LLM ignored instructions
    cleaned_questions = []
    for q in questions:
        # Strip common prefixes like "1. ", "2) ", etc.
        import re
        q_clean = re.sub(r'^\d+[\s\.\)-]+', '', q).strip()
        if q_clean:
            cleaned_questions.append(q_clean)

    fallbacks = [
        "Tell me about yourself.",
        "Why should we hire you?",
        "What are your strengths?",
        "What are your weaknesses?",
        "Describe a challenge you faced or a conflict you resolved.",
        "Where do you see yourself in 5 years?"
    ]

    for fb in fallbacks:
        if len(cleaned_questions) >= 5:
            break
        if fb not in cleaned_questions:
            cleaned_questions.append(fb)

    return cleaned_questions[:5]
