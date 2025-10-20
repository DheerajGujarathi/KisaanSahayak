# Frontend - RAG-Farmers

This folder contains the React frontend application for the KisaanSahayak farming assistant.

## Contents

- **src/**: Source code for the React application
  - **components/**: React components (ChatInterface, ChatHistory, Header, Sidebar)
  - **services/**: API service layer for backend communication
  - **styles/**: CSS and theme files
- **public/**: Static assets
- **package.json**: React dependencies and scripts

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with:
```
REACT_APP_API_URL=http://localhost:3001
```

3. Run the frontend:
```bash
npm start
```

The frontend will start on `http://localhost:3000` by default.

## Features

- Interactive chat interface
- Chat history management
- Responsive design
- User-friendly UI for farmers
- Real-time communication with backend

## Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.
