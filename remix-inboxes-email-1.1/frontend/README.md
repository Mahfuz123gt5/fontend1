# Frontend Deployment Guide (Cloudflare Pages)

## Cloudflare Pages Setup Instructions

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Workers & Pages** -> **Create application** -> **Pages** -> **Connect to Git**
3. Select your GitHub Repository (`wormup-app`)
4. Build Configuration:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Build Output Directory**: `dist`
   - **Root Directory**: leave blank (`/`) or `frontend`
5. Environment Variables:
   - Key: `VITE_API_BASE_URL`
   - Value: `https://<YOUR-RENDER-BACKEND-NAME>.onrender.com/api/v1`
6. Click **Save and Deploy**.
