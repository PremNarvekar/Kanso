# Local Development Workflow

Quick guide for running and updating the URL shortener locally.

## Initial Setup (One Time)

1. **Install Dependencies**:
   ```bash
   cd backend
   npm install
   ```

2. **Configure Environment**:
   - Your `.env` file is already set up with MongoDB and Google OAuth credentials
   - Located at: `backend/.env`

## Running Locally

### Development Mode (Recommended for updates)

```bash
cd backend
npm run dev
```

**Benefits**:
- Auto-restarts on file changes (uses nodemon)
- Faster iteration when developing features
- No need to manually restart after code changes

### Production Mode

```bash
cd backend
npm start
```

**Use when**:
- Testing production configuration
- Verifying deployment setup

## Frontend Development

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:5173` and connect to backend at `http://localhost:3000`

## Making Updates

### 1. Add New Features

1. Start dev server: `npm run dev` in `backend/`
2. Make your code changes
3. Server auto-restarts on save
4. Test at `http://localhost:3000`

### 2. Database Changes

- Local MongoDB: Your `.env` points to MongoDB Atlas (cloud)
- All changes are saved to the cloud database
- Safe to develop and test without affecting production

### 3. API Testing

**Health Check**:
```bash
curl http://localhost:3000/health
```

**Create Short URL**:
```bash
curl -X POST http://localhost:3000/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://example.com"}'
```

**Test Redirect**:
Open `http://localhost:3000/{shortId}` in browser

## Project Structure

```
shortner-url/
├── backend/
│   ├── app.js              # Main server file
│   ├── .env                # Environment variables (local)
│   ├── .env.example        # Environment template
│   ├── package.json        # Dependencies & scripts
│   └── src/
│       ├── config/         # DB, passport config
│       ├── controller/     # Route handlers
│       ├── dao/            # Database operations
│       ├── model/          # MongoDB schemas
│       ├── routes/         # API routes
│       ├── service/        # Business logic
│       └── utils/          # Helper functions
└── frontend/
    ├── src/               # React components
    └── package.json       # Frontend dependencies
```

## Common Tasks

### Update Dependencies
```bash
cd backend
npm update
```

### View Logs
Dev mode shows logs in terminal automatically

### Reset Database
Use MongoDB Atlas dashboard to drop collections if needed

### Switch Between Local & Production

**Local** (`.env`):
```env
APP_URL=http://localhost:3000/
GOOGLE_CALLBACK_URL=http://localhost:3000/auth/google/callback
```

**Production** (Render environment variables):
```env
APP_URL=https://your-app.onrender.com/
GOOGLE_CALLBACK_URL=https://your-app.onrender.com/auth/google/callback
```

## Tips

✅ **Always use `npm run dev`** for local development - it's much faster!

✅ **Keep `.env` private** - never commit it to Git (it's in `.gitignore`)

✅ **Test locally before deploying** - run `npm start` to test production config

✅ **Use the same MongoDB** - your local dev uses the same Atlas database, so be careful with destructive operations

## Troubleshooting

**Port already in use**:
```bash
# Windows: Kill process on port 3000
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**MongoDB connection failed**:
- Check `.env` has correct `MONGODB_URI`
- Verify MongoDB Atlas network access allows your IP
- Check database user credentials

**dotenv not loading**:
- Ensure `.env` is in the `backend/` directory
- Check for syntax errors in `.env` (no quotes needed around values)

## Deployment Flow

1. Develop locally: `npm run dev`
2. Test locally: `npm start`
3. Commit to Git: `git push`
4. Render auto-deploys from GitHub
5. Test production endpoint

Your setup is ready for local development! 🚀
