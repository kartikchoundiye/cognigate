from fastapi import FastAPI, Request
from app.config.cors import setup_cors
from app.routes.auth_routes import router as auth_router
from app.routes.resume_routes import router as resume_router
from app.routes.interview_routes import router as interview_router
from app.routes.resume_metadata_routes import router as resume_metadata_router
from app.routes.interview_session_routes import router as interview_session_router
from app.database.base import Base, engine
from app.models import user, refresh_token, resume_metadata, interview_session
from fastapi.responses import RedirectResponse

import asyncio
from contextlib import asynccontextmanager
from datetime import datetime
from app.database.base import SessionLocal
from app.models.refresh_token import RefreshToken
from app.models.otp import OTP

# Commented by agent, reason: Adding active background cleanup mechanism for expired tokens and OTPs
# Base.metadata.create_all(bind=engine)
# 
# app = FastAPI(
# End commented by agent

Base.metadata.create_all(bind=engine)

async def cleanup_expired_tokens_loop():
    while True:
        try:
            db = SessionLocal()
            try:
                db.query(RefreshToken).filter(RefreshToken.expires_at < datetime.utcnow()).delete()
                db.query(OTP).filter(OTP.expires_at < datetime.utcnow()).delete()
                db.commit()
                print("Periodic cleanup: Expired tokens and OTPs removed from database.")
            except Exception as e:
                print(f"Error during periodic cleanup: {e}")
                db.rollback()
            finally:
                db.close()
            
            # Wait for 1 hour (3600 seconds) before running the next cleanup
            await asyncio.sleep(3600)
        except asyncio.CancelledError:
            break

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Start background cleanup task
    cleanup_task = asyncio.create_task(cleanup_expired_tokens_loop())
    yield
    # Cancel task on shutdown
    cleanup_task.cancel()

app = FastAPI(
    lifespan=lifespan,
    title="CogniGate API",
    description="AI-powered Interview Preparation Platform",
    version="1.0.0",
)

setup_cors(app)

app.include_router(auth_router, prefix="/api/auth", tags=["Authentication"])
app.include_router(resume_router,prefix="/api/resume",tags=["Resume"])
app.include_router(resume_metadata_router,prefix="/api/resume",tags=["Resume Metadata"])
app.include_router(interview_router,prefix="/api/interview",tags=["Interview"])
app.include_router(interview_session_router,prefix="/api/interview-session",tags=["Interview Session"])

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
