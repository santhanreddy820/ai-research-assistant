from pydantic import BaseModel
from datetime import datetime
from typing import Optional
from .user import User

class ResearchBase(BaseModel):
    title: str
    description: Optional[str] = None

class ResearchCreate(ResearchBase):
    pass

class Research(ResearchBase):
    id: int
    status: str
    created_at: datetime
    owner_id: int
    owner: User

    class Config:
        orm_mode = True
