from fastapi import (
    APIRouter,
    Depends,
    UploadFile,
    File,
    Form,
    HTTPException,
)

from sqlalchemy.orm import Session
from fastapi.responses import FileResponse

from app.database.base import SessionLocal

from app.models.resume import Resume
from app.models.user import User

from app.schemas.resume_schema import (
    RenameResumeRequest,
)

from app.services.resume.chroma_service import (
    get_resume_chunks,
)

from app.services.resume.resume_service import (
    upload_resume_service,
    delete_resume_service,
)

from app.utils.dependencies import get_current_user

import os


router = APIRouter()

# =====================================
# DATABASE
# =====================================


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


# =====================================
# UPLOAD RESUME
# =====================================


@router.post("/upload-resume")
def upload_resume(
    title: str = Form(...),
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    # FILE VALIDATION

    if not file.filename.endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files allowed"
        )

    return upload_resume_service(
        title=title,
        file=file,
        current_user=current_user,
        db=db,
    )


# =====================================
# GET MY RESUMES
# =====================================


@router.get("/my-resumes")
def get_my_resumes(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    resumes = db.query(Resume).filter(
        Resume.user_id == current_user.id
    ).all()

    # =====================================
    # NO RESUMES FOUND
    # =====================================

    if not resumes:

        return {
            "message": "No resumes found",
            "resumes": []
        }

    # =====================================
    # FORMAT RESPONSE
    # =====================================

    formatted_resumes = []

    for resume in resumes:

        formatted_resumes.append({
            "id": resume.id,
            "title": resume.title,
            "file_name": resume.file_name,
            "created_at": resume.created_at,
        })

    return {
        "message": "Resumes fetched successfully",
        "total_resumes": len(formatted_resumes),
        "resumes": formatted_resumes
    }


# =====================================
# RENAME RESUME
# =====================================


@router.put("/rename-resume/{resume_id}")
def rename_resume(
    resume_id: int,
    data: RenameResumeRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    resume.title = data.new_title

    db.commit()

    db.refresh(resume)

    return {
        "message": "Resume renamed successfully",
        "resume_id": resume.id,
        "new_title": resume.title,
    }


# =====================================
# DELETE RESUME
# =====================================


@router.delete("/delete-resume/{resume_id}")
def delete_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return delete_resume_service(
        resume=resume,
        db=db,
    )


# =====================================
# DOWNLOAD RESUME
# =====================================


@router.get("/download-resume/{resume_id}")
def download_resume(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    if not os.path.exists(resume.file_path):

        raise HTTPException(
            status_code=404,
            detail="File not found on server"
        )

    return FileResponse(
        path=resume.file_path,
        filename=resume.file_name,
        media_type="application/pdf"
    )


# =====================================
# VIEW RESUME CHUNKS
# =====================================


@router.get("/chunks/{resume_id}")
def view_resume_chunks(
    resume_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):

    # =====================================
    # CHECK OWNERSHIP
    # =====================================

    resume = db.query(Resume).filter(
        Resume.id == resume_id,
        Resume.user_id == current_user.id,
    ).first()

    if not resume:

        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # =====================================
    # GET CHUNKS
    # =====================================

    results = get_resume_chunks(
        resume_id
    )

    documents = results.get(
        "documents",
        []
    )

    formatted_chunks = []

    for index, chunk in enumerate(documents):

        formatted_chunks.append({
            "chunk_number": index + 1,
            "content": chunk,
        })

    return {
        "resume_id": resume.id,
        "resume_title": resume.title,
        "total_chunks": len(formatted_chunks),
        "chunks": formatted_chunks,
    }