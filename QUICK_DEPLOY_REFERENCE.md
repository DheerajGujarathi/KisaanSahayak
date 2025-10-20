# 🚀 Quick Deployment Reference - KisaanSahayak

## ⚡ Fastest Deployment (5 Minutes)

### Render.com (All-in-One) - **RECOMMENDED**
```
1. Visit: https://render.com
2. Sign in with GitHub
3. New → Blueprint
4. Select: KisaanSahayak repository
5. Add env: GROQ_API_KEY
6. Click: Apply
7. ✅ Done! (URLs will be provided)
```

**Why Render?**
- ✅ Free tier
- ✅ Auto-detects all 3 services
- ✅ One-click deploy
- ✅ Free SSL

---

## 📦 Alternative Options

### Option 2: Railway.app
```
https://railway.app → New Project → GitHub → KisaanSahayak
```

### Option 3: Vercel (Frontend) + Render (Backend/AI)
```bash
cd frontend
npm install -g vercel
vercel --prod
# Then deploy backend + AI on Render
```

### Option 4: Docker (Local/Self-hosted)
```bash
docker-compose up --build -d
```

---

## 🔑 Required Environment Variables

| Service | Variable | Where to Get |
|---------|----------|--------------|
| AI Engine | `GROQ_API_KEY` | https://console.groq.com |
| Backend | `AI_ENGINE_URL` | From AI Engine deployment URL |
| Frontend | `REACT_APP_BACKEND_URL` | From Backend deployment URL |

---

## 🎯 Platform URLs After Deployment

### Render.com
- Frontend: `https://kisaan-frontend.onrender.com`
- Backend: `https://kisaan-backend.onrender.com`
- AI Engine: `https://kisaan-ai-engine.onrender.com`

### Vercel
- Frontend: `https://kisaan-sahayak.vercel.app`

### Railway
- Auto-generated: `https://[service-name].railway.app`

---

## 📁 Files Created for Deployment

✅ `render.yaml` - Render.com config (all services)
✅ `vercel.json` - Vercel config
✅ `docker-compose.yml` - Docker orchestration
✅ `Dockerfile` (×3) - Container configs
✅ `nginx.conf` - Production web server
✅ `.github/workflows/deploy.yml` - Auto-deployment
✅ `DEPLOYMENT_GUIDE.md` - Full documentation
✅ `quick-deploy.bat/.sh` - Deployment scripts

---

## 🔄 Auto-Deployment (CI/CD)

**GitHub Actions is configured!**

Every push to `main` branch automatically:
1. ✅ Tests all services
2. ✅ Builds frontend
3. ✅ Deploys to production

**Setup Required Secrets:**
1. Go to: `Settings → Secrets → Actions`
2. Add these secrets:
   - `VERCEL_TOKEN` (from vercel.com/account/tokens)
   - `RENDER_DEPLOY_HOOK_BACKEND` (from Render service settings)
   - `RENDER_DEPLOY_HOOK_AI` (from Render service settings)
   - `VERCEL_ORG_ID` (from Vercel project settings)
   - `VERCEL_PROJECT_ID` (from Vercel project settings)

---

## 🛠️ Quick Commands

### Local Development
```bash
# Start all services
./start-all.sh          # Linux/Mac
start-all.bat           # Windows

# Or manually:
cd ai-engine && python app.py &
cd backend && npm start &
cd frontend && npm start &
```

### Docker
```bash
# Build and run
docker-compose up --build

# Run in background
docker-compose up -d

# View logs
docker-compose logs -f

# Stop
docker-compose down
```

### Deploy
```bash
# Quick deploy menu
./quick-deploy.sh       # Linux/Mac
quick-deploy.bat        # Windows
```

---

## 🎨 Custom Domain

### After deployment, add custom domain:

**Render:**
Service Settings → Custom Domains → Add domain

**Vercel:**
Project Settings → Domains → Add

**Update DNS:**
```
Type: CNAME
Name: www
Value: [provided by platform]
```

---

## 🐛 Troubleshooting

### Build Failed?
```bash
# Clear and reinstall
rm -rf node_modules package-lock.json
npm install
```

### CORS Error?
- Update `CORS_ORIGIN` in backend env variables
- Set to your frontend URL

### Can't connect to backend?
- Check environment variables
- Ensure URLs don't have trailing slashes
- Verify services are running

### ChromaDB issues?
- Ensure `Chroma_db/` directory exists
- Check file permissions
- Use volume mounts in Docker

---

## 💰 Cost Estimate

| Platform | Free Tier | Paid Plan |
|----------|-----------|-----------|
| **Render** | 750 hrs/mo | $7/service |
| **Vercel** | 100 GB bandwidth | $20/mo |
| **Railway** | $5 credit/mo | Usage-based |
| **Netlify** | 100 GB bandwidth | $19/mo |

**Recommendation:** Start with free tiers, scale as needed

---

## 📊 What Recruiters Will See

✅ **Live Demo**: Working application on the internet
✅ **GitHub Repo**: Professional code organization
✅ **CI/CD**: Automated deployment pipeline
✅ **Documentation**: Comprehensive setup guides
✅ **Architecture**: Multi-service deployment
✅ **DevOps**: Docker, containers, orchestration
✅ **Best Practices**: Environment configs, security

---

## 🎯 Next Steps

1. ✅ Deploy to Render.com (5 min)
2. ✅ Test all features
3. ✅ Add custom domain (optional)
4. ✅ Set up monitoring (UptimeRobot)
5. ✅ Share link with recruiters!

---

## 📞 Need Help?

- **Full Guide**: `DEPLOYMENT_GUIDE.md`
- **Issues**: https://github.com/DheerajGujarathi/KisaanSahayak/issues
- **Quick Deploy**: Run `quick-deploy.sh` or `quick-deploy.bat`

---

**🚀 You're ready to deploy! Choose Render.com for the fastest experience.**
