from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime

from app.models import Research as ResearchModel, User
from app.db.database import get_db
from app.schemas.user import Research, ResearchCreate, ResearchUpdate
from app.api.endpoints.dependencies import get_current_user

router = APIRouter()

@router.post("", response_model=Research, status_code=status.HTTP_201_CREATED)
async def create_research(
    research: ResearchCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Create a new research project for the current user.
    """
    db_research = ResearchModel(
        title=research.title,
        description=research.description,
        status=research.status,
        owner_id=current_user.id,
        created_at=datetime.utcnow(),
        updated_at=datetime.utcnow()
    )
    db.add(db_research)
    db.commit()
    db.refresh(db_research)
    return db_research

@router.get("", response_model=List[Research])
async def read_researches(
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Retrieve a list of research projects for the current user.
    """
    researches = db.query(ResearchModel).filter(
        ResearchModel.owner_id == current_user.id
    ).order_by(ResearchModel.created_at.desc()).offset(skip).limit(limit).all()
    return researches

@router.get("/{research_id}", response_model=Research)
async def read_research(
    research_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Get a specific research project by ID.
    """
    db_research = db.query(ResearchModel).filter(
        ResearchModel.id == research_id,
        ResearchModel.owner_id == current_user.id
    ).first()
    if not db_research:
        raise HTTPException(status_code=404, detail="Research not found")
    return db_research

@router.put("/{research_id}", response_model=Research)
async def update_research(
    research_id: int,
    research_update: ResearchUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Update a research project.
    """
    db_research = db.query(ResearchModel).filter(
        ResearchModel.id == research_id,
        ResearchModel.owner_id == current_user.id
    ).first()
    
    if not db_research:
        raise HTTPException(status_code=404, detail="Research not found")
    
    # Update fields if they are provided in the request
    update_data = research_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_research, field, value)
    
    db_research.updated_at = datetime.utcnow()
    
    db.add(db_research)
    db.commit()
    db.refresh(db_research)
    
    return db_research

@router.delete("/{research_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_research(
    research_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    """
    Delete a research project.
    """
    db_research = db.query(ResearchModel).filter(
        ResearchModel.id == research_id,
        ResearchModel.owner_id == current_user.id
    ).first()
    
    if not db_research:
        raise HTTPException(status_code=404, detail="Research not found")
    
    db.delete(db_research)
    db.commit()
    
    return None
