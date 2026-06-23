from pydantic import BaseModel


class InterviewQueryRequest(
    BaseModel
):

    resume_id: int

    query: str


class AptitudeStartRequest(
    BaseModel
):
    resume_id: int


class AptitudeAnswerRequest(
    BaseModel
):
    session_id: int
    answer: str


class HRStartRequest(
    BaseModel
):
    resume_id: int


class HRAnswerRequest(
    BaseModel
):
    session_id: int
    answer: str