KNOWN_SKILLS = [

    "python",
    "java",
    "c++",
    "javascript",

    "react",
    "fastapi",
    "django",

    "postgresql",
    "mysql",
    "mongodb",

    "langchain",
    "langgraph",
    "chromadb",

    "machine learning",
    "deep learning",

    "docker",
    "git",
    "github"
]


def extract_skills(text: str):

    text = text.lower()

    found_skills = []

    for skill in KNOWN_SKILLS:

        if skill in text:

            found_skills.append(skill)

    return list(
        set(found_skills)
    )
