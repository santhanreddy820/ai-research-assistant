# AI Research Assistant

An autonomous AI system that helps with research by searching for papers, extracting insights, and generating comprehensive reports.

## Features

- 🔍 Automated research paper discovery
- 📄 PDF parsing and analysis
- 🧠 AI-powered insights extraction
- 📊 Structured research reports
- 🔗 Source citations and references

## Prerequisites

- Docker and Docker Compose
- Python 3.9+
- Node.js 16+
- npm or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-research-assistant
   ```

2. **Configure Environment Variables**
   - Copy `.env.example` to `.env`
   - Update the API keys in `.env`:
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `BROWSERLESS_API_KEY`: Your Browserless API key
     - `SEMANTIC_SCHOLAR_API_KEY`: Your Semantic Scholar API key

3. **Build and Run with Docker (Recommended)**
   ```bash
   docker-compose up --build
   ```

4. **Or Run Locally**

   **Backend:**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: .\venv\Scripts\activate
   pip install -r requirements.txt
   uvicorn app.main:app --reload
   ```

   **Frontend:**
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Docs: http://localhost:8000/docs

## Project Structure

```
ai-research-assistant/
├── backend/               # FastAPI backend
│   ├── app/               # Application code
│   │   ├── models/        # Database models
│   │   ├── services/      # Business logic
│   │   └── utils/         # Helper functions
│   ├── tests/             # Backend tests
│   └── requirements.txt   # Python dependencies
├── frontend/              # React frontend
│   ├── public/            # Static files
│   └── src/               # React components
└── docker-compose.yml     # Docker configuration
```

## API Documentation

Once the backend is running, you can access the interactive API documentation at:
- Swagger UI: http://localhost:8000/docs
- ReDoc: http://localhost:8000/redoc

## Environment Variables

See `.env.example` for all available environment variables.

## Development

### Backend

- Run tests:
  ```bash
  cd backend
  pytest
  ```

- Database migrations:
  ```bash
  alembic revision --autogenerate -m "Your migration message"
  alembic upgrade head
  ```

### Frontend

- Run linter:
  ```bash
  cd frontend
  npm run lint
  ```

- Run tests:
  ```bash
  cd frontend
  npm test
  ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Built with FastAPI, React, and Docker
- Uses OpenAI's GPT models for natural language processing
- Integrates with Semantic Scholar API for paper discovery
