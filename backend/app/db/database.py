from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker, Session

from app.core.config import settings

# Create SQLAlchemy engine
engine = create_engine(
    settings.DATABASE_URL,
    pool_pre_ping=True,
    connect_args={"check_same_thread": False} if "sqlite" in settings.DATABASE_URL else {}
)

# Create a configured "Session" class
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for models
Base = declarative_base()

def get_db() -> Session:
    """
    Dependency function that yields database sessions.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

def init_db() -> None:
    """
    Initialize the database by creating all tables.
    """
    import app.models  # Import models to ensure they are registered with SQLAlchemy
    Base.metadata.create_all(bind=engine)

# For backward compatibility
get_db_session = get_db
