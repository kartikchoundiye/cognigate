from app.models.resume import Resume

from app.services.resume.pdf_parser import (
    extract_text_from_pdf
)

from app.services.resume.text_chunker import (
    chunk_text
)

from app.services.resume.file_service import (
    save_uploaded_file,
    delete_file,
)

from app.services.resume.chroma_service import (
    store_resume_chunks,
    delete_resume_chunks,
)


def upload_resume_service(
    title,
    file,
    current_user,
    db,
):

    # SAVE FILE

    file_path = save_uploaded_file(file)

    # SAVE DATABASE

    resume = Resume(
        user_id=current_user.id,
        title=title,
        file_name=file.filename,
        file_path=file_path,
    )

    db.add(resume)

    db.commit()

    db.refresh(resume)

    # EXTRACT TEXT

    extracted_text = extract_text_from_pdf(
        file_path
    )

    # CHUNK TEXT

    chunks = chunk_text(extracted_text)

    # STORE CHUNKS

    store_resume_chunks(
        resume_id=resume.id,
        resume_title=resume.title,
        user_id=current_user.id,
        chunks=chunks,
    )

    return {
        "message": "Resume uploaded successfully",
        "resume_id": resume.id,
        "chunks_stored": len(chunks),
    }


def delete_resume_service(
    resume,
    db,
):

    # DELETE FILE

    delete_file(resume.file_path)

    # DELETE CHROMADB

    delete_resume_chunks(
        resume.id
    )

    # DELETE DATABASE

    db.delete(resume)

    db.commit()

    return {
        "message": "Resume deleted successfully"
    }