from pydantic import BaseModel

class StartInterviewRequest(BaseModel):
    resume_id: int

class AnswerRequest(BaseModel):
    session_id: int
    answer: str
