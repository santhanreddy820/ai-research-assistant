from fastapi import APIRouter
from app.api.endpoints import auth, research

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(research.router, prefix="/researches", tags=["researches"])
