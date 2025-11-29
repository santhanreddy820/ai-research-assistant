from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.db.database import engine, Base
from app.models import User, Research
from app.api.api import api_router
from app.core.config import settings

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="API for managing AI research projects",
    version="1.0.0",
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Set up CORS middleware
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
else:
    # Allow all origins if not specified in settings
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

# Include API router
app.include_router(api_router, prefix=settings.API_V1_STR)

@app.get("/", tags=["status"])
async def root():
    return {
        "message": "AI Research Assistant API is running",
        "docs": "/docs",
        "redoc": "/redoc"
    }

@app.get("/health", tags=["status"])
async def health_check():
    return {
        "status": "healthy",
        "version": "1.0.0",
        "environment": settings.ENVIRONMENT
    }