# PrepInter Deployment Checklist ✅

## 🔧 Backend Deployment (Render)

### Setup Complete:
- ✅ Code pushed to GitHub
- ✅ Build script added to package.json
- ✅ Error middleware fixed
- ✅ Favicon route added
- ✅ Health check endpoint added

### Configure Environment Variables on Render:
1. Go to your Render dashboard: https://dashboard.render.com
2. Select your backend service
3. Go to **Environment** tab
4. Add these variables:

```
MONGO_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/prepinter?retryWrites=true&w=majority
JWT_SECRET=your_secure_random_string_min_32_chars
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_specific_password
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
GROQ_API_KEY=your_new_groq_api_key
OPENAI_API_KEY=your_openai_key (optional)
NODE_ENV=production
PORT=5000
```

### Verify Backend:
After deployment, test:
- ✅ `https://your-backend.onrender.com/health` → `{"status":"OK"}`
- ✅ `https://your-backend.onrender.com/` → `{"message":"Welcome to PrepInter API"}`

---

## 🎨 Frontend Deployment (Vercel)

### Setup Complete:
- ✅ Code pushed to GitHub
- ✅ vercel.json created
- ✅ Build tested locally (dist folder works)
- ✅ API URL configured in env.example

### Deploy to Vercel:
1. Go to https://vercel.com
2. Click **"New Project"**
3. Import from GitHub: `Mohammad90-ui/Capstone_Project_PrepInter`
4. Configure:
   - **Root Directory**: `capstone-project/frontend`
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
5. Click **"Deploy"**

### Configure Environment Variables on Vercel:
1. Go to your project dashboard
2. Click **Settings** → **Environment Variables**
3. Add:
```
VITE_API_URL=https://your-backend-url.onrender.com/api
```
(Replace with your actual Render backend URL)

4. **Redeploy** to apply changes

---

## 🔗 Final URLs

After deployment, you'll have:

- **Backend URL**: `https://your-app.onrender.com`
- **Frontend URL**: `https://your-app.vercel.app`

Update the frontend's `VITE_API_URL` to point to your backend URL!

---

## 🧪 Testing

### Backend Tests:
```bash
# Health check
curl https://your-backend.onrender.com/health

# Welcome message
curl https://your-backend.onrender.com/

# Test user registration (should work)
curl -X POST https://your-backend.onrender.com/api/users \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"Test123!"}'
```

### Frontend Tests:
1. Open your Vercel URL
2. Test user registration/login
3. Test interview creation
4. Check analytics dashboard

---

## ⚠️ Important Security Notes

1. **Never commit `.env` files** - Already fixed! ✅
2. **Rotate your Groq API key** - Create a new one if the old one leaked
3. **Use strong JWT_SECRET** - Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`
4. **Configure CORS** on Render if needed for frontend domain

---

## 🆘 Troubleshooting

### Backend Issues:
- If build fails: Check Node version is 18.x
- If crashes: Check environment variables are set
- If DB error: Verify MongoDB Atlas network access (0.0.0.0/0)

### Frontend Issues:
- If blank page: Check browser console for API errors
- If 404: Verify vercel.json routes are correct
- If API fails: Check VITE_API_URL is set correctly

---

**Need help?** Check the main DEPLOYMENT.md guide for detailed instructions.

