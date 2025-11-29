from pydantic import AnyHttpUrl, BaseSettings, EmailStr, validator
from typing import List, Optional, Union
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

class Settings(BaseSettings):
    # API Configuration
    API_V1_STR: str = "/api/v1"
    PROJECT_NAME: str = "AI Research Assistant API"
    ENVIRONMENT: str = os.getenv("ENVIRONMENT", "development")
    
    # Security
    SECRET_KEY: str = os.getenv("SECRET_KEY", "your-secret-key-here")
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days
    ALGORITHM: str = "HS256"
    
    # CORS
    BACKEND_CORS_ORIGINS: List[AnyHttpUrl] = []
    
    @validator("BACKEND_CORS_ORIGINS", pre=True)
    def assemble_cors_origins(cls, v: Union[str, List[str]]) -> Union[List[str], str]:
        if isinstance(v, str) and not v.startswith("["):
            return [i.strip() for i in v.split(",")]
        elif isinstance(v, (list, str)):
            return v
        raise ValueError(v)
    
    # Database
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./test.db")
    
    # First superuser
    FIRST_SUPERUSER_EMAIL: EmailStr = os.getenv("FIRST_SUPERUSER_EMAIL", "admin@example.com")
    FIRST_SUPERUSER_PASSWORD: str = os.getenv("FIRST_SUPERUSER_PASSWORD", "admin")
    
    class Config:
        case_sensitive = True

# Create settings instance
settings = Settings()
