import chromadb

client = chromadb.PersistentClient(
    path="chroma_db"
)

collection = client.get_or_create_collection(
    name="resume_embeddings"
)


def store_resume_chunks(
    chunks,
    embeddings,
    user_id
):

    for index, chunk in enumerate(chunks):

        collection.add(

            documents=[chunk],

            embeddings=[embeddings[index]],

            ids=[f"{user_id}_{index}"],

            metadatas=[
                {
                    "user_id": user_id
                }
            ]
        )

def get_resume_chunks(user_id):

    results = collection.get(
        where={"user_id": user_id}
    )

    return results