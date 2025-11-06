# 🚀 Deployment Checklist - PrepInter

This document outlines all the fixes made and what you need to configure for successful deployment.

## ✅ Fixes Applied

### 1. **CORS Configuration (Backend)**
- ✅ Updated CORS to be environment-aware
- ✅ Allows all origins in development
- ✅ Restricts to specific origins in production
- ✅ Supports wildcard patterns for Vercel deployments
- ✅ Configured to allow credentials

### 2. **Logger Error Fix**
- ✅ Fixed undefined `logger` reference in `server.js`
- ✅ Now uses `console.error` for error logging

### 3. **API URL Configuration**
- ✅ Updated `frontend/env.example` to include `/api` path
- ✅ Enhanced `frontend/src/services/api.js` to automatically handle URL formatting
- ✅ Now works with or without `/api` in the environment variable

### 4. **Vercel Configuration**
- ✅ Created `frontend/vercel.json` for proper SPA routing
- ✅ Configured rewrite rules for React Router
- ✅ Added cache headers for static assets

## 📋 Deployment Steps

### Backend Deployment (Render/Railway/Vercel)

1. **Set Environment Variables in your hosting platform:**
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_secure_jwt_secret_key
   NODE_ENV=production
   PORT=5000
   ALLOWED_ORIGINS=https://your-frontend-domain.vercel.app,https://*.vercel.app
   EMAIL_USER=your_email@example.com
   EMAIL_PASS=your_app_password
   RAZORPAY_KEY_ID=your_razorpay_key
   RAZORPAY_SECRET=your_razorpay_secret
   OPENAI_API_KEY=your_openai_key
   ```

2. **Important CORS Configuration:**
   - Set `ALLOWED_ORIGINS` to your frontend URL(s)
   - Separate multiple origins with commas: `https://app1.vercel.app,https://app2.vercel.app`
   - The backend will automatically allow `*.vercel.app` subdomains if you include `https://*.vercel.app`

3. **Build Settings:**
   - Build Command: `npm install`
   - Start Command: `npm start`

### Frontend Deployment (Vercel)

1. **Set Environment Variables in Vercel Dashboard:**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```
   **OR** (without /api - the code will add it automatically):
   ```
   VITE_API_URL=https://your-backend-url.onrender.com
   ```

2. **Build Settings:**
   - Framework Preset: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

3. **Root Directory:** Set to `frontend` if deploying from monorepo

## 🔍 Testing Your Deployment

### 1. Test Backend Health
```bash
curl https://your-backend-url.onrender.com/health
```
Should return: `{"status":"OK"}`

### 2. Test CORS
Open browser console on your frontend and check Network tab:
- All API requests should have status 200 (not CORS errors)
- Check response headers include: `Access-Control-Allow-Origin`

### 3. Test API Connection
In browser console on frontend:
```javascript
fetch('https://your-backend-url.onrender.com/api/users/login', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ email: 'test@test.com', password: 'test' })
})
```

## 🐛 Common Issues & Solutions

### Issue: CORS Errors in Production
**Solution:**
1. Check that `ALLOWED_ORIGINS` includes your exact frontend URL
2. Make sure `NODE_ENV=production` is set in backend
3. Verify frontend URL matches exactly (including https/http, www/non-www)

### Issue: API 404 Errors
**Solution:**
1. Verify `VITE_API_URL` includes `/api` at the end
2. Check backend routes are mounted under `/api`
3. Test backend directly: `https://your-backend-url.onrender.com/api/users`

### Issue: Environment Variables Not Working
**Solution:**
1. Vite requires `VITE_` prefix for frontend env vars
2. Restart build after adding env vars
3. Check variable names match exactly (case-sensitive)

### Issue: Frontend Routes Not Working (404 on refresh)
**Solution:**
- The `frontend/vercel.json` should handle this
- Verify `vercel.json` has the rewrite rule: `"source": "/(.*)", "destination": "/index.html"`

## 📝 Quick Reference

### Backend URL Format
```
https://your-backend.onrender.com
```

### Frontend Environment Variable
```
VITE_API_URL=https://your-backend.onrender.com/api
```

### Backend CORS Environment Variable
```
ALLOWED_ORIGINS=https://your-frontend.vercel.app
```

## ✨ What's Ready

- ✅ CORS properly configured for production
- ✅ API URL handling is robust
- ✅ Error handling improved
- ✅ Vercel configuration for SPA routing
- ✅ Environment-aware configurations

## 🎯 Next Steps

1. Deploy backend first
2. Get backend URL
3. Set `VITE_API_URL` in frontend environment variables
4. Set `ALLOWED_ORIGINS` in backend with frontend URL
5. Deploy frontend
6. Test all functionality

---

**Your app is now deployment-ready! 🚀**

