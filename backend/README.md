# AI Research Assistant - Backend

This is the backend service for the AI Research Assistant application, built with FastAPI and SQLAlchemy.

## Features

- User authentication with JWT
- CRUD operations for research projects
- Secure password hashing
- CORS support
- Environment-based configuration
- SQLite database (can be configured to use PostgreSQL)

## Prerequisites

- Python 3.8+
- pip (Python package manager)

## Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-research-assistant/backend
   ```

2. **Create a virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up environment variables**
   Copy the `.env.example` file to `.env` and update the values as needed:
   ```bash
   cp .env.example .env
   ```

5. **Initialize the database**
   ```bash
   python -m scripts.init_db
   ```

## Running the Application

### Development

To run the application in development mode with auto-reload:

```bash
uvicorn app.main:app --reload
```

The API will be available at `http://localhost:8000`

### Production

For production, you should use a production-grade ASGI server like `uvicorn` with multiple workers and a reverse proxy like Nginx.

```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

## API Documentation

Once the application is running, you can access the interactive API documentation at:

- Swagger UI: `http://localhost:8000/docs`
- ReDoc: `http://localhost:8000/redoc`

## Project Structure

```
backend/
├── app/
│   ├── api/                  # API routes
│   │   ├── endpoints/        # API endpoints
│   │   └── __init__.py
│   ├── core/                 # Core functionality
│   │   ├── config.py         # Configuration settings
│   │   └── security.py       # Security utilities
│   ├── db/                   # Database configuration
│   │   ├── database.py       # Database connection and session
│   │   └── __init__.py
│   ├── models/               # Database models
│   │   └── __init__.py
│   ├── schemas/              # Pydantic models
│   │   └── __init__.py
│   ├── __init__.py
│   └── main.py               # FastAPI application
├── scripts/                  # Utility scripts
│   └── init_db.py            # Database initialization script
├── tests/                    # Test files
├── .env                      # Environment variables
├── .gitignore
├── alembic.ini               # Database migration configuration
├── requirements.txt          # Project dependencies
└── README.md                 # This file
```

## Testing

To run the tests:

```bash
pytest
```

## Deployment

### Docker

A `Dockerfile` is provided for containerized deployment:

```bash
docker build -t ai-research-assistant-backend .
docker run -d -p 8000:8000 --env-file .env ai-research-assistant-backend
```

### Vercel

This application is configured for deployment on Vercel. The `vercel.json` file contains the necessary configuration.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
