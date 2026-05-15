from pydantic_settings import BaseSettings
from datetime import timedelta
import os
from dotenv import load_dotenv

load_dotenv()


class Settings(BaseSettings):

    DATABASE_URL: str
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int
    REFRESH_TOKEN_EXPIRE_DAYS: int
    GROQ_API_KEY: str

    # Database
    DB_USER: str
    DB_PASSWORD: str
    DB_HOST: str
    DB_PORT: int
    DB_NAME: str

    # Email
    EMAIL_HOST: str
    EMAIL_PORT: int
    EMAIL_USER: str
    EMAIL_PASSWORD: str

    class Config:
        env_file = ".env"


settings = Settings()

# SECRET_KEY = os.getenv("SECRET_KEY")

# ACCESS_TOKEN_EXPIRE_MINUTES = 60
# REFRESH_TOKEN_EXPIRE_DAYS = 1

# ALGORITHM = os.getenv("ALGORITHM")

# EMAIL_HOST = "smtp.gmail.com"
# EMAIL_PORT = 587
# EMAIL_USER = "cognigate.noreply@gmail.com"
# EMAIL_PASSWORD = "niyciovpgswgyeey"
