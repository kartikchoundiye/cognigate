import os
import uuid
import shutil


def save_uploaded_file(file):

    os.makedirs("uploads", exist_ok=True)

    unique_filename = (
        f"{uuid.uuid4()}_{file.filename}"
    )

    file_path = f"uploads/{unique_filename}"

    with open(file_path, "wb") as buffer:

        shutil.copyfileobj(file.file, buffer)

    return file_path


def delete_file(file_path: str):

    if os.path.exists(file_path):

        os.remove(file_path)