# Deployment Guide - Render

This guide will help you deploy your URL Shortener backend to Render.

## Prerequisites

- GitHub account with your code pushed to a repository
- [Render account](https://render.com/) (free tier available)
- [MongoDB Atlas account](https://www.mongodb.com/cloud/atlas) (free tier available)
- Google OAuth credentials (if using Google login)

## MongoDB Atlas Setup

1. **Create a MongoDB Cluster**:
   - Go to [MongoDB Atlas](https://cloud.mongodb.com)
   - Create a new cluster (free M0 tier is sufficient)
   - Wait for the cluster to be created (2-3 minutes)

2. **Create Database User**:
   - Go to "Database Access" in the left sidebar
   - Click "Add New Database User"
   - Create username and password (save these!)
   - Grant "Read and write to any database" privileges

3. **Configure Network Access**:
   - Go to "Network Access" in the left sidebar
   - Click "Add IP Address"
   - Click "Allow Access from Anywhere" (0.0.0.0/0)
   - Confirm

4. **Get Connection String**:
   - Go to "Database" in the left sidebar
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<database>` with your database name (e.g., `urlshortener`)

## Render Deployment

### 1. Create Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Select your repository

### 2. Configure Service

Fill in the following settings:

- **Name**: `your-app-name` (e.g., `my-url-shortener`)
- **Region**: Choose closest to your users
- **Branch**: `main` (or your default branch)
- **Root Directory**: `backend`
- **Runtime**: `Node`
- **Build Command**: `npm install`
- **Start Command**: `npm start`
- **Instance Type**: Free (or paid if needed)

### 3. Add Environment Variables

Click "Advanced" → "Add Environment Variable" and add these:

| Key | Value | Example |
|-----|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.mongodb.net/urlshortener` |
| `APP_URL` | Your Render app URL (with trailing slash) | `https://my-url-shortener.onrender.com/` |
| `JWT_SECRET` | Random secret string (64+ characters) | Generate using crypto |
| `GOOGLE_CLIENT_ID` | Your Google OAuth client ID | `xxxxx.apps.googleusercontent.com` |
| `GOOGLE_CLIENT_SECRET` | Your Google OAuth client secret | `GOCSPX-xxxxx` |
| `GOOGLE_CALLBACK_URL` | Your Render URL + callback path | `https://my-url-shortener.onrender.com/auth/google/callback` |

**To generate JWT_SECRET**:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Deploy

1. Click "Create Web Service"
2. Wait for the deployment to complete (3-5 minutes)
3. Check the logs for any errors

## Google OAuth Setup (If Using)

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Enable "Google+ API"
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Configure consent screen if prompted
6. Application type: "Web application"
7. Add Authorized redirect URIs:
   - `http://localhost:3000/auth/google/callback` (for local dev)
   - `https://your-app-name.onrender.com/auth/google/callback` (for production)
8. Copy Client ID and Client Secret to Render environment variables

## Verify Deployment

### 1. Check Health Endpoint

Visit: `https://your-app-name.onrender.com/health`

You should see:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

### 2. Check Logs

In Render dashboard:
- Click on your service
- Go to "Logs" tab
- Look for: `Server running on port XXXX` and `MongoDB Connected: xxxxx`

### 3. Test API Endpoints

Using a tool like Postman or curl:

**Create Short URL**:
```bash
curl -X POST https://your-app-name.onrender.com/api/shorten \
  -H "Content-Type: application/json" \
  -d '{"url": "https://google.com"}'
```

**Test Redirect**:
- Open the short URL in your browser
- It should redirect to the original URL

## Troubleshooting

### "Short URL Not Found" Error

**Cause**: The database is empty or the short URL doesn't exist.

**Solution**: 
1. Create a short URL first using the API or frontend
2. Verify the URL was saved to MongoDB Atlas (check Collections in Atlas)
3. Test the redirect with the newly created short URL

### "Application failed to respond"

**Cause**: Environment variables not set correctly or MongoDB connection failed.

**Solution**:
1. Check Render logs for error messages
2. Verify all environment variables are set correctly
3. Test MongoDB connection string locally first
4. Ensure Network Access is set to "Allow from Anywhere" in Atlas

### "Cannot connect to MongoDB"

**Cause**: Wrong connection string or network access not configured.

**Solution**:
1. Double-check connection string (username, password, database name)
2. Verify Network Access allows 0.0.0.0/0 in MongoDB Atlas
3. Check if database user has correct permissions

### Free Tier Spin Down

**Note**: Render free tier spins down after 15 minutes of inactivity. First request after spin down will take 30-60 seconds.

**Solutions**:
- Upgrade to paid tier
- Use a service like [UptimeRobot](https://uptimerobot.com/) to ping your health endpoint every 14 minutes
- Accept the delay for free hosting

## Updating Your Deployment

When you push changes to your GitHub repository:

1. Render will automatically detect the changes
2. It will rebuild and redeploy your service
3. Monitor the logs during deployment
4. Verify the changes using the health endpoint and API tests

## Frontend Integration

Once backend is deployed, update your frontend:

1. Set the API URL environment variable to your Render URL:
   ```
   VITE_API_URL=https://your-app-name.onrender.com
   ```
2. Deploy your frontend (Vercel, Netlify, or Render)
3. Test the complete flow: create short URL → copy → test redirect

## Next Steps

- [ ] Set up custom domain (optional)
- [ ] Configure CORS for your frontend domain
- [ ] Set up monitoring/alerting
- [ ] Add analytics tracking
- [ ] Implement rate limiting
- [ ] Set up automated backups for MongoDB

## Support

If you encounter issues:
1. Check Render logs first
2. Verify all environment variables
3. Test MongoDB connection using MongoDB Compass
4. Review Google OAuth setup if using authentication
