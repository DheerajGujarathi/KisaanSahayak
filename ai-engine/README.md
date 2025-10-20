# AI Engine - RAG-Farmers

This folder contains the AI engine powered by RAG (Retrieval-Augmented Generation) for the KisaanSahayak farming assistant.

## Contents

- **app.py**: Main Flask application that handles RAG-based query processing
- **requirements.txt**: Python dependencies for the AI engine
- **crop_guide.txt**: Knowledge base containing farming information
- **Chroma_db/**: Vector database for document embeddings and retrieval

## Setup

1. Install Python dependencies:
```bash
pip install -r requirements.txt
```

2. Create a `.env` file in the root directory with:
```
GROQ_API_KEY=your_groq_api_key_here
```

3. Run the AI engine:
```bash
python app.py
```

The AI engine will start on `http://localhost:5000` by default.

## Features

- RAG-based question answering using LangChain
- Vector database with ChromaDB for efficient retrieval
- Groq LLM integration for intelligent responses
- Flask API for communication with the backend
