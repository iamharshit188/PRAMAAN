# Praman App Setup Instructions

## Prerequisites
- Node.js 14+
- Python 3.8+
- Hugging Face account and token

## Setup Steps

1. Backend FastAPI Setup:
```bash
cd backend-fastapi
python -m venv venv
source venv/bin/activate  # On Windows: .\venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your Hugging Face token
python start_server.py
```

2. Backend Node.js Setup:
```bash
cd backend-node
npm install
cp .env.example .env
# Edit .env if needed
npm start
```

3. Frontend Setup:
```bash
cd frontend
npm install
cp .env.example .env
# Update .env with the Ngrok URL from FastAPI server
npm start
```

## Environment Variables

### FastAPI Backend (.env)
- HF_TOKEN: Your Hugging Face token
- MODEL_CACHE_DIR: Directory to cache the model
- CORS_ORIGINS: Allowed origins for CORS

### Node.js Backend (.env)
- PORT: Server port (default: 3000)
- FASTAPI_URL: URL to FastAPI server
- NODE_ENV: development/production

### Frontend (.env)
- REACT_APP_API_URL: Node.js backend URL
- REACT_APP_FASTAPI_URL: FastAPI backend URL (Ngrok URL in production) 