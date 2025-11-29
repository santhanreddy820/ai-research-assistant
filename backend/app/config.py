from pydantic import BaseSettings, AnyHttpUrl
from typing import List, Optional
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # API Settings
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Research Assistant"
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = [
        "http://localhost:3000",  # Default frontend port
        "http://localhost:8000",  # Default backend port
    ]
    
    # OpenAI
    OPENAI_API_KEY: str = os.getenv("OPENAI_API_KEY", "")
    
    # Browserless (for web scraping)
    BROWSERLESS_API_KEY: str = os.getenv("BROWSERLESS_API_KEY", "")
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./research_assistant.db")
    
    # File Storage
    UPLOAD_FOLDER: str = "uploads"
    MAX_CONTENT_LENGTH: int = 16 * 1024 * 1024  # 16MB max upload size
    ALLOWED_EXTENSIONS: set = {"pdf"}
    
    # Semantic Scholar API
    SEMANTIC_SCHOLAR_API_KEY: str = os.getenv("SEMANTIC_SCHOLAR_API_KEY", "")
    
    class Config:
        case_sensitive = True
        env_file = ".env"

# Initialize settings
settings = Settings()

# Create uploads directory if it doesn't exist
os.makedirs(settings.UPLOAD_FOLDER, exist_ok=True)
