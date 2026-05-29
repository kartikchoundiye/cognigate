from pydantic import BaseModel
from datetime import datetime

class ResumeResponse(BaseModel):

    id: int
    title: str
    file_name: str
    file_path: str
    created_at: datetime

    class Config:
        from_attributes = True

class RenameResumeRequest(BaseModel):

    new_title: str