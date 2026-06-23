from app.models.resume_metadata import (
    ResumeMetadata
)


def get_resume_profile(
    resume_id,
    db
):

    profile = db.query(
        ResumeMetadata
    ).filter(

        ResumeMetadata.resume_id
        == resume_id

    ).first()

    if not profile:

        return {}

    return profile.metadata_json
