import chromadb

# =====================================
# CHROMADB CLIENT
# =====================================

client = chromadb.PersistentClient(path="chroma_db")

collection = client.get_or_create_collection(name="resume_chunks")

# =====================================
# STORE CHUNKS
# =====================================

def store_resume_chunks(
    resume_id: int,
    resume_title: str,
    user_id: int,
    chunks: list
):

    documents = []
    ids = []
    metadatas = []

    for index, chunk in enumerate(chunks):

        documents.append(chunk)

        ids.append(
            f"resume_{resume_id}_chunk_{index}"
        )

        metadatas.append({
            "resume_id": resume_id,
            "resume_title": resume_title,
            "user_id": user_id,
            "chunk_number": index + 1,
        })

    collection.add(
        documents=documents,
        ids=ids,
        metadatas=metadatas,
    )

# =====================================
# GET CHUNKS
# =====================================

def get_resume_chunks(resume_id: int):

    results = collection.get(

        where={
            "resume_id": resume_id
        }

    )

    return results

# =====================================
# DELETE CHUNKS
# =====================================


def delete_resume_chunks(resume_id: int):

    collection.delete(
        where={
            "resume_id": resume_id
        }
    )