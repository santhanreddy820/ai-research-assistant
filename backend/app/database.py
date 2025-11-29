from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Get database URL from environment variables or use SQLite as default
SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL", "sqlite:///./test.db")

# For SQLite, we need to add check_same_thread=False
connect_args = {}
if SQLALCHEMY_DATABASE_URL.startswith('sqlite'):
    connect_args["check_same_thread"] = False

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args=connect_args,
    pool_pre_ping=True
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    """Dependency that provides a database session."""
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
