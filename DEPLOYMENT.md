# PrepInter Deployment Guide

This guide will help you deploy PrepInter to production using modern cloud platforms.

## 🚀 Deployment Options

### Option 1: Render (Recommended for Backend)

#### Backend Deployment on Render

1. **Prepare Backend for Deployment**
   ```bash
   cd capstone-project/backend
   ```

2. **Create a new Web Service on Render**
   - Go to [render.com](https://render.com)
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `capstone-project/backend` folder

3. **Configure Build Settings**
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18.x

4. **Set Environment Variables**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/prepinter
   JWT_SECRET=your_production_jwt_secret
   EMAIL_USER=your_production_email
   EMAIL_PASS=your_app_password
   RAZORPAY_KEY_ID=your_razorpay_key_id
   RAZORPAY_SECRET=your_razorpay_secret
   OPENAI_API_KEY=your_openai_api_key
   NODE_ENV=production
   ```

5. **Deploy**
   - Click "Create Web Service"
   - Render will automatically build and deploy your backend

### Option 2: Vercel (Alternative for Backend)

#### Backend Deployment on Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy Backend**
   ```bash
   cd capstone-project/backend
   vercel
   ```

3. **Configure Environment Variables**
   - Go to Vercel Dashboard
   - Select your project
   - Go to Settings → Environment Variables
   - Add all required environment variables

### Frontend Deployment

#### Deploy Frontend on Vercel

1. **Prepare Frontend**
   ```bash
   cd capstone-project/frontend
   ```

2. **Create vercel.json**
   ```json
   {
     "builds": [
       {
         "src": "package.json",
         "use": "@vercel/static-build",
         "config": {
           "distDir": "dist"
         }
       }
     ],
     "routes": [
       {
         "src": "/(.*)",
         "dest": "/index.html"
       }
     ]
   }
   ```

3. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select the `capstone-project/frontend` folder
   - Set build command: `npm run build`
   - Set output directory: `dist`

4. **Configure Environment Variables**
   ```
   VITE_API_URL=https://your-backend-url.onrender.com/api
   ```

#### Alternative: Deploy Frontend on Netlify

1. **Build the Project**
   ```bash
   cd capstone-project/frontend
   npm run build
   ```

2. **Deploy to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `dist` folder
   - Or connect your GitHub repository

3. **Configure Environment Variables**
   - Go to Site Settings → Environment Variables
   - Add `VITE_API_URL`

## 🗄️ Database Setup

### MongoDB Atlas (Recommended)

1. **Create MongoDB Atlas Account**
   - Go to [mongodb.com/cloud/atlas](https://mongodb.com/cloud/atlas)
   - Create a free account

2. **Create a Cluster**
   - Click "Build a Database"
   - Choose "M0 Sandbox" (Free tier)
   - Select your preferred region

3. **Configure Database Access**
   - Go to "Database Access"
   - Add a new database user
   - Set username and password

4. **Configure Network Access**
   - Go to "Network Access"
   - Add IP address (0.0.0.0/0 for all IPs)

5. **Get Connection String**
   - Go to "Clusters"
   - Click "Connect"
   - Choose "Connect your application"
   - Copy the connection string

## 🔧 Production Configuration

### Backend Production Settings

1. **Update server.js for production**
   ```javascript
   // Add CORS configuration for production
   app.use(cors({
     origin: ['https://your-frontend-domain.vercel.app'],
     credentials: true
   }));
   ```

2. **Add health check endpoint**
   ```javascript
   app.get('/health', (req, res) => {
     res.status(200).json({ status: 'OK' });
   });
   ```

### Frontend Production Settings

1. **Update API configuration**
   ```javascript
   // In src/services/api.js
   const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://your-backend-url.onrender.com/api';
   ```

2. **Add error boundaries**
   ```javascript
   // Create src/components/ErrorBoundary.jsx
   import React from 'react';
   
   class ErrorBoundary extends React.Component {
     constructor(props) {
       super(props);
       this.state = { hasError: false };
     }
   
     static getDerivedStateFromError(error) {
       return { hasError: true };
     }
   
     render() {
       if (this.state.hasError) {
         return <h1>Something went wrong.</h1>;
       }
       return this.props.children;
     }
   }
   ```

## 🔐 Security Checklist

### Backend Security
- [ ] Use HTTPS in production
- [ ] Set secure JWT secrets
- [ ] Configure CORS properly
- [ ] Use environment variables for secrets
- [ ] Add rate limiting
- [ ] Validate all inputs
- [ ] Use helmet.js for security headers

### Frontend Security
- [ ] Use HTTPS
- [ ] Sanitize user inputs
- [ ] Implement proper error handling
- [ ] Use secure authentication tokens
- [ ] Add Content Security Policy

## 📊 Monitoring & Analytics

### Backend Monitoring
1. **Add logging**
   ```javascript
   const winston = require('winston');
   
   const logger = winston.createLogger({
     level: 'info',
     format: winston.format.json(),
     transports: [
       new winston.transports.File({ filename: 'error.log', level: 'error' }),
       new winston.transports.File({ filename: 'combined.log' })
     ]
   });
   ```

2. **Add performance monitoring**
   - Use New Relic or DataDog
   - Monitor response times
   - Track error rates

### Frontend Monitoring
1. **Add error tracking**
   ```javascript
   // Install Sentry
   npm install @sentry/react
   
   // Initialize in main.jsx
   import * as Sentry from "@sentry/react";
   
   Sentry.init({
     dsn: "YOUR_SENTRY_DSN",
   });
   ```

## 🚀 Deployment Commands

### Quick Deploy Script
```bash
#!/bin/bash
# deploy.sh

echo "Deploying PrepInter..."

# Deploy Backend
echo "Deploying backend to Render..."
cd backend
# Add your deployment commands here

# Deploy Frontend
echo "Deploying frontend to Vercel..."
cd ../frontend
# Add your deployment commands here

echo "Deployment complete!"
```

## 🔄 CI/CD Pipeline

### GitHub Actions
Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy PrepInter

on:
  push:
    branches: [ main ]

jobs:
  deploy-backend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Render
        # Add your deployment steps

  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy to Vercel
        # Add your deployment steps
```

## 🐛 Troubleshooting

### Common Issues

1. **CORS Errors**
   - Check CORS configuration in backend
   - Ensure frontend URL is whitelisted

2. **Environment Variables**
   - Verify all environment variables are set
   - Check for typos in variable names

3. **Database Connection**
   - Verify MongoDB connection string
   - Check network access settings

4. **Build Failures**
   - Check Node.js version compatibility
   - Verify all dependencies are installed

### Debug Commands

```bash
# Check backend logs
vercel logs

# Check frontend build
npm run build

# Test API endpoints
curl https://your-backend-url.onrender.com/health
```

## 📈 Performance Optimization

### Backend Optimization
- Enable gzip compression
- Use Redis for caching
- Optimize database queries
- Add request rate limiting

### Frontend Optimization
- Enable code splitting
- Use CDN for static assets
- Optimize images
- Implement lazy loading

## 🎯 Post-Deployment

1. **Test all functionality**
   - User registration/login
   - Interview creation and completion
   - Payment processing
   - Analytics dashboard

2. **Set up monitoring**
   - Configure alerts
   - Set up uptime monitoring
   - Monitor performance metrics

3. **Documentation**
   - Update README with production URLs
   - Document API endpoints
   - Create user guides

---

**Your PrepInter app is now live! 🚀**

For support, check the troubleshooting section or create an issue in the repository.
