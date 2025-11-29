import sys
import logging
from typing import Any, Dict

from sqlalchemy.orm import Session

# Add the app directory to the path
from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent))

from app.core.config import settings
from app.core.security import get_password_hash
from app.db.database import Base, engine, SessionLocal
from app.models import User

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Make sure all SQL Alchemy models are imported before initializing DB
def init_db(db: Session) -> None:
    # Create all tables
    Base.metadata.create_all(bind=engine)
    
    # Create the first superuser if it doesn't exist
    user = db.query(User).filter(User.email == settings.FIRST_SUPERUSER_EMAIL).first()
    
    if not user:
        user_in = {
            "email": settings.FIRST_SUPERUSER_EMAIL,
            "password": settings.FIRST_SUPERUSER_PASSWORD,
            "full_name": "Admin",
            "is_superuser": True,
            "is_active": True,
        }
        
        # Create user
        db_obj = User(
            email=user_in["email"],
            hashed_password=get_password_hash(user_in["password"]),
            full_name=user_in["full_name"],
            is_active=user_in["is_active"],
            is_superuser=user_in["is_superuser"],
        )
        db.add(db_obj)
        db.commit()
        db.refresh(db_obj)
        
        logger.info(f"Superuser {user_in['email']} created successfully!")
    else:
        logger.info(f"Superuser {settings.FIRST_SUPERUSER_EMAIL} already exists")

if __name__ == "__main__":
    logger.info("Creating initial data")
    db = SessionLocal()
    init_db(db)
    logger.info("Initial data created")
