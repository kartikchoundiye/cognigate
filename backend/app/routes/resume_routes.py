import os

from fastapi import (
    APIRouter,
    UploadFile,
    File,
    Depends,
    HTTPException
)

from sqlalchemy.orm import Session

from app.database.base import SessionLocal

from app.models.resume import Resume

from app.models.user import User

from app.utils.dependencies import (
    get_current_user
)

from app.services.resume.pdf_parser import (
    extract_text_from_pdf
)

from app.services.resume.text_chunker import (
    chunk_text
)

from app.services.resume.embedding_service import (
    generate_embedding
)

from app.services.resume.chroma_service import (
    store_resume_chunks,
    get_resume_chunks
)

router = APIRouter()


UPLOAD_FOLDER = "uploaded_resumes"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)


def get_db():

    db = SessionLocal()

    try:
        yield db

    finally:
        db.close()


@router.post("/upload")
async def upload_resume(

    file: UploadFile = File(...),

    current_user: User = Depends(
        get_current_user
    ),

    db: Session = Depends(get_db)

):

    # VALIDATE PDF

    if not file.filename.endswith(".pdf"):

        raise HTTPException(
            status_code=400,
            detail="Only PDF files allowed"
        )

    # SAVE FILE

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    with open(file_path, "wb") as buffer:

        buffer.write(
            await file.read()
        )

    # SAVE DB RECORD

    resume = Resume(

        user_id=current_user.id,

        file_name=file.filename,

        file_path=file_path
    )

    db.add(resume)

    db.commit()

    db.refresh(resume)

    # EXTRACT TEXT

    extracted_text = extract_text_from_pdf(
        file_path
    )

    # CHUNK TEXT

    chunks = chunk_text(
        extracted_text
    )

    # GENERATE EMBEDDINGS

    embeddings = []

    for chunk in chunks:

        embedding = generate_embedding(
            chunk
        )

        embeddings.append(embedding)

    # STORE IN CHROMADB

    store_resume_chunks(
        chunks=chunks,
        embeddings=embeddings,
        user_id=current_user.id
    )

    return {
        "message": "Resume uploaded successfully",
        "chunks_stored": len(chunks)
    }


@router.get("/chunks")
def view_resume_chunks(

    current_user: User = Depends(
        get_current_user
    )

):

    results = get_resume_chunks(
        current_user.id
    )

    formatted_chunks = []

    for index, chunk in enumerate(
        results["documents"]
    ):

        formatted_chunks.append({
            "chunk_number": index + 1,
            "content": chunk
        })

    return formatted_chunks