from app.services.resume.chroma_service import (
    collection
)


def retrieve_resume_context(
    resume_id: int,
    query: str,
    n_results: int = 5,
):

    results = collection.query(

        query_texts=[query],

        n_results=n_results,

        where={
            "resume_id": resume_id
        }

    )

    documents = results.get(
        "documents",
        [[]]
    )[0]

    return "\n\n".join(
        documents
    )