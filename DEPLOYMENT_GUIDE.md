# 🚀 Complete Deployment Guide - KisaanSahayak

## Table of Contents
1. [Quick Start Options](#quick-start-options)
2. [Platform-Specific Guides](#platform-specific-guides)
3. [Environment Variables](#environment-variables)
4. [Docker Deployment](#docker-deployment)
5. [CI/CD Setup](#cicd-setup)
6. [Custom Domain](#custom-domain)
7. [Troubleshooting](#troubleshooting)

---

## Quick Start Options

### 🏆 Recommended: Render.com (All-in-One)

**Why Render?**
- ✅ Free tier available
- ✅ Supports all three services (Python, Node.js, React)
- ✅ Auto-deploy from GitHub
- ✅ Built-in SSL certificates
- ✅ Easy environment variable management

**Steps:**
1. Go to [render.com](https://render.com)
2. Sign in with GitHub
3. Click "New" → "Blueprint"
4. Connect your `KisaanSahayak` repository
5. Render will automatically detect the `render.yaml` configuration
6. Add your `GROQ_API_KEY` in environment variables
7. Click "Apply" - All three services deploy automatically!

**URLs after deployment:**
- Frontend: `https://kisaan-frontend.onrender.com`
- Backend: `https://kisaan-backend.onrender.com`
- AI Engine: `https://kisaan-ai-engine.onrender.com`

---

## Platform-Specific Guides

### Option 1: Vercel (Frontend + Backend Only)

**Frontend Deployment:**
```bash
# Install Vercel CLI
npm install -g vercel

# Navigate to frontend
cd frontend

# Deploy
vercel

# Follow prompts:
# - Link to project: Yes
# - Project name: kisaan-sahayak-frontend
# - Settings: Use defaults
```

**Backend Deployment:**
```bash
# Navigate to backend
cd backend

# Deploy
vercel

# Add environment variables in Vercel dashboard:
# AI_ENGINE_URL = your-ai-engine-url
```

**Note:** Deploy AI Engine on Render.com (Vercel doesn't support Python well)

---

### Option 2: Railway.app

**Steps:**
1. Visit [railway.app](https://railway.app)
2. Click "Start a New Project"
3. Choose "Deploy from GitHub repo"
4. Select `KisaanSahayak`
5. Railway auto-detects all three services
6. Configure environment variables:
   - `GROQ_API_KEY` for AI Engine
   - `AI_ENGINE_URL` for Backend
   - `REACT_APP_BACKEND_URL` for Frontend
7. Click "Deploy"

**Advantages:**
- Automatic service detection
- Built-in database support (PostgreSQL/MySQL)
- Very simple setup
- $5 free monthly credit

---

### Option 3: Netlify (Frontend) + Render (Backend + AI)

**Frontend on Netlify:**
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Navigate to frontend
cd frontend

# Build
npm run build

# Deploy
netlify deploy --prod

# Drag and drop the 'build' folder when prompted
```

**Backend + AI on Render:**
Follow the Render.com guide above for backend and AI engine.

---

### Option 4: AWS (Production-Grade)

**Services Needed:**
- **Frontend**: AWS S3 + CloudFront
- **Backend**: AWS Elastic Beanstalk or ECS
- **AI Engine**: AWS ECS with Fargate

**Quick AWS Deployment:**
```bash
# Install AWS CLI
# Configure credentials
aws configure

# Deploy frontend to S3
cd frontend
npm run build
aws s3 sync build/ s3://kisaan-sahayak-frontend

# Enable static website hosting
aws s3 website s3://kisaan-sahayak-frontend --index-document index.html

# Deploy backend & AI using Elastic Beanstalk
cd ../backend
eb init
eb create kisaan-backend-env

cd ../ai-engine
eb init
eb create kisaan-ai-env
```

---

## Environment Variables

### Required Environment Variables

**Frontend (.env):**
```env
REACT_APP_BACKEND_URL=http://localhost:3001
# Production:
REACT_APP_BACKEND_URL=https://your-backend-url.com
```

**Backend (.env):**
```env
PORT=3001
AI_ENGINE_URL=http://localhost:5000
# Production:
AI_ENGINE_URL=https://your-ai-engine-url.com
CORS_ORIGIN=https://your-frontend-url.com
```

**AI Engine (.env):**
```env
GROQ_API_KEY=your_groq_api_key_here
FLASK_PORT=5000
FLASK_ENV=production
```

### Getting GROQ API Key
1. Visit [console.groq.com](https://console.groq.com)
2. Sign up/Login
3. Navigate to API Keys
4. Create new key
5. Copy and save securely

---

## Docker Deployment

### Prerequisites
- Docker installed
- Docker Compose installed

### Local Docker Testing
```bash
# Build and run all services
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down
```

### Deploy to Docker Hub
```bash
# Login to Docker Hub
docker login

# Build images
docker build -t yourusername/kisaan-frontend:latest ./frontend
docker build -t yourusername/kisaan-backend:latest ./backend
docker build -t yourusername/kisaan-ai-engine:latest ./ai-engine

# Push to Docker Hub
docker push yourusername/kisaan-frontend:latest
docker push yourusername/kisaan-backend:latest
docker push yourusername/kisaan-ai-engine:latest
```

### Deploy to Google Cloud Run
```bash
# Build and push to Google Container Registry
gcloud builds submit --tag gcr.io/PROJECT_ID/kisaan-frontend ./frontend
gcloud builds submit --tag gcr.io/PROJECT_ID/kisaan-backend ./backend
gcloud builds submit --tag gcr.io/PROJECT_ID/kisaan-ai-engine ./ai-engine

# Deploy to Cloud Run
gcloud run deploy kisaan-frontend --image gcr.io/PROJECT_ID/kisaan-frontend --platform managed
gcloud run deploy kisaan-backend --image gcr.io/PROJECT_ID/kisaan-backend --platform managed
gcloud run deploy kisaan-ai-engine --image gcr.io/PROJECT_ID/kisaan-ai-engine --platform managed
```

---

## CI/CD Setup

### GitHub Actions (Automated Deployment)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy KisaanSahayak

on:
  push:
    branches: [ main ]

jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - name: Deploy to Vercel
        run: |
          cd frontend
          npm install -g vercel
          vercel --prod --token=${{ secrets.VERCEL_TOKEN }}

  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK_BACKEND }}

  deploy-ai-engine:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - name: Deploy to Render
        run: |
          curl -X POST ${{ secrets.RENDER_DEPLOY_HOOK_AI }}
```

**Setup GitHub Secrets:**
1. Go to repository Settings → Secrets → Actions
2. Add:
   - `VERCEL_TOKEN`
   - `RENDER_DEPLOY_HOOK_BACKEND`
   - `RENDER_DEPLOY_HOOK_AI`

---

## Custom Domain Setup

### Render.com
1. Go to your service dashboard
2. Click "Settings" → "Custom Domains"
3. Add your domain (e.g., `www.kisaansahayak.com`)
4. Update DNS records:
   ```
   Type: CNAME
   Name: www
   Value: [provided by Render]
   ```

### Vercel
1. Project Settings → Domains
2. Add domain
3. Configure DNS:
   ```
   Type: CNAME
   Name: @
   Value: cname.vercel-dns.com
   ```

### Netlify
1. Site Settings → Domain Management
2. Add custom domain
3. Update DNS:
   ```
   Type: A
   Name: @
   Value: 75.2.60.5
   ```

---

## Troubleshooting

### Common Issues

**1. CORS Errors**
```javascript
// backend/server.js - Add CORS middleware
const cors = require('cors');
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*'
}));
```

**2. Environment Variables Not Loading**
- Verify `.env` files are in correct locations
- Check platform-specific env variable settings
- Restart services after changes

**3. Build Failures**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install

# Python dependencies
pip install --upgrade pip
pip install -r requirements.txt --force-reinstall
```

**4. Database Connection Issues (ChromaDB)**
- Ensure `Chroma_db/` directory is persisted
- Use volume mounts in Docker
- Check file permissions

**5. Port Already in Use**
```bash
# Find and kill process
lsof -ti:5000 | xargs kill -9  # For port 5000
lsof -ti:3001 | xargs kill -9  # For port 3001
lsof -ti:3000 | xargs kill -9  # For port 3000
```

---

## Performance Optimization

### Frontend
- Enable gzip compression (nginx.conf already configured)
- Use CDN for static assets
- Implement lazy loading for components
- Enable service worker for PWA

### Backend
- Implement Redis caching
- Use connection pooling
- Enable compression middleware
- Rate limiting for API endpoints

### AI Engine
- Cache vector embeddings
- Implement request queuing
- Use async processing for heavy tasks
- Optimize ChromaDB queries

---

## Monitoring & Logging

### Recommended Tools
- **Uptime Monitoring**: UptimeRobot, Pingdom
- **Application Monitoring**: New Relic, Datadog
- **Error Tracking**: Sentry
- **Logs**: Logtail, Papertrail

### Setup Sentry (Error Tracking)
```bash
# Install
npm install @sentry/react @sentry/node

# Configure in frontend/src/index.js
import * as Sentry from "@sentry/react";
Sentry.init({ dsn: "YOUR_DSN" });
```

---

## Cost Comparison

| Platform | Free Tier | Monthly Cost (Basic) | Best For |
|----------|-----------|----------------------|----------|
| Render | 750 hrs/mo | $7/service | Full Stack |
| Vercel | 100 GB bandwidth | $20/team | Frontend |
| Railway | $5 credit | $5+ usage-based | Quick Prototypes |
| Netlify | 100 GB bandwidth | $19/site | Static Sites |
| AWS | 12 months free | $20-50+ | Enterprise |

---

## Security Checklist

- [ ] Enable HTTPS/SSL
- [ ] Secure API keys in environment variables
- [ ] Implement rate limiting
- [ ] Add CORS restrictions
- [ ] Enable security headers
- [ ] Regular dependency updates
- [ ] Input validation & sanitization
- [ ] Implement authentication (if needed)

---

## Next Steps After Deployment

1. ✅ Test all endpoints
2. ✅ Set up monitoring
3. ✅ Configure custom domain
4. ✅ Enable analytics (Google Analytics)
5. ✅ Set up error tracking
6. ✅ Create backup strategy
7. ✅ Document API endpoints
8. ✅ Share with recruiters! 🎉

---

**Need Help?** Open an issue on [GitHub](https://github.com/DheerajGujarathi/KisaanSahayak/issues)
