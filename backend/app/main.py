from fastapi import FastAPI, Request
from app.config.cors import setup_cors
from app.routes.auth_routes import router as auth_router
from app.routes.resume_routes import router as resume_router
from app.database.base import Base, engine
from app.models import user, refresh_token
from fastapi.responses import RedirectResponse

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CogniGate API",
    description="AI-powered Interview Preparation Platform",
    version="1.0.0",
)

setup_cors(app)

app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(resume_router,prefix="/api/resume",tags=["Resume"])


@app.get(
    "/",
    summary="API Health Check",
    description="Returns current status of CogniGate backend service",
)
def root(request: Request):

    accept_header = request.headers.get("accept", "")

    if "text/html" in accept_header:
        return RedirectResponse(url="/docs")

    return {
        "service": "CogniGate API",
        "message": "CogniGate Backend Running",
        "version": "1.0.0",
        "docs": "/docs",
    }


# @app.get("/")
# def home():
#     return {
#         "service": "CogniGate API",
#         "message": "CogniGate Backend Running",
#         "version": "1.0.0",
#         "docs": "/docs",
#     }


# @app.get("/")
# def root():
#     return RedirectResponse(url="/docs")
