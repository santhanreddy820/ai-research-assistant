from pydantic import BaseModel, EmailStr, Field
from typing import Optional, List
from datetime import datetime
from enum import Enum

# Token related schemas
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    email: Optional[str] = None

# User related schemas
class UserBase(BaseModel):
    email: EmailStr
    full_name: Optional[str] = None

class UserCreate(UserBase):
    password: str

class UserUpdate(BaseModel):
    email: Optional[EmailStr] = None
    full_name: Optional[str] = None
    password: Optional[str] = None

class UserInDBBase(UserBase):
    id: int
    is_active: bool = True
    created_at: datetime

    class Config:
        orm_mode = True

class User(UserInDBBase):
    pass

class UserInDB(UserInDBBase):
    hashed_password: str

# Research related schemas
class ResearchBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: str = "pending"

class ResearchCreate(ResearchBase):
    pass

class ResearchUpdate(ResearchBase):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[str] = None

class Research(ResearchBase):
    id: int
    owner_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        orm_mode = True
