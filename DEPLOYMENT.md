# Deployment Guide (Vercel + GitHub)

This guide explains how to deploy this Turborepo monorepo to Vercel using GitHub. Both the frontend (`apps/web`) and backend API (`apps/api`) can now be deployed to Vercel.

## Prerequisites

1.  **GitHub Repository**: Push this project to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).
3.  **Environment Variables**: Prepare your environment variables (see `apps/web/.env.example` for reference).

## Architecture Overview

- **Frontend** (`apps/web`): Next.js application → Vercel
- **Backend** (`apps/api`): Hono API with Vercel serverless adapter → Vercel

Both applications will be deployed as separate Vercel projects.

---

## 1. Deploying the Backend API (`apps/api`)

The API has been converted to use Vercel's serverless runtime using Hono's Vercel adapter.

### Steps:

1.  **Go to Vercel Dashboard**: Click **"Add New..."** > **"Project"**.
2.  **Import Git Repository**: Select your GitHub repository.
3.  **Configure Project**:
    *   **Project Name**: Enter a name (e.g., `my-turbo-api`).
    *   **Framework Preset**: Select **Other** (Hono is not in the preset list).
    *   **Root Directory**: Click "Edit" and select `apps/api`.
4.  **Build Settings**:
    *   **Build Command**: `pnpm build` (or leave default)
    *   **Output Directory**: Leave empty (Vercel will use the serverless function)
    *   **Install Command**: `pnpm install` (Vercel auto-detects from `pnpm-lock.yaml`)
5.  **Environment Variables**:
    *   Add all required environment variables from your `.env.local` file:
        - `DATABASE_URL`
        - `DIRECT_URL` (if using Prisma)
        - `NEXT_PUBLIC_SUPABASE_URL` (if using Supabase)
        - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (if using Supabase)
        - `SUPABASE_SERVICE_ROLE_KEY` (if using Supabase)
    *   **Important**: You'll need to add `NEXT_PUBLIC_WEB_URL` after deploying the frontend (see step 3).
6.  **Deploy**: Click **Deploy**.
7.  **Copy API URL**: After deployment, copy the production URL (e.g., `https://my-turbo-api.vercel.app`).

---

## 2. Deploying the Frontend (`apps/web`)

The `apps/web` package is a Next.js application and is fully optimized for Vercel.

### Steps:

1.  **Go to Vercel Dashboard**: Click **"Add New..."** > **"Project"**.
2.  **Import Git Repository**: Select your GitHub repository (same repo as the API).
3.  **Configure Project**:
    *   **Project Name**: Enter a name (e.g., `my-turbo-web`).
    *   **Framework Preset**: Select **Next.js**.
    *   **Root Directory**: Click "Edit" and select `apps/web`.
4.  **Build Settings**:
    *   Vercel usually auto-detects these for Next.js in a monorepo.
    *   **Build Command**: `pnpm build` (or rely on default)
    *   **Install Command**: `pnpm install`
5.  **Environment Variables**:
    *   Add the API URL from step 1:
        - `NEXT_PUBLIC_API_URL=https://my-turbo-api.vercel.app`
    *   Add any other frontend environment variables from your `.env.local` file.
6.  **Deploy**: Click **Deploy**.
7.  **Copy Frontend URL**: After deployment, copy the production URL (e.g., `https://my-turbo-web.vercel.app`).

---

## 3. Post-Deployment Configuration

After both projects are deployed, you need to configure them to communicate with each other:

### Update API Environment Variables:

1.  Go to your **API project** in Vercel dashboard.
2.  Navigate to **Settings** > **Environment Variables**.
3.  Add or update:
    ```
    NEXT_PUBLIC_WEB_URL=https://my-turbo-web.vercel.app
    ```
4.  **Redeploy** the API project for changes to take effect (go to Deployments > click "..." > Redeploy).

### Verify CORS Configuration:

The API's CORS settings are now environment-aware and will automatically allow requests from:
- `http://localhost:3000` and `http://localhost:3001` (development)
- The Vercel URL (production)
- The `NEXT_PUBLIC_WEB_URL` environment variable

---

## 4. Local Development

To test the serverless setup locally:

### Install Vercel CLI:
```bash
npm i -g vercel
```

### Test API locally:
```bash
cd apps/api
vercel dev
```

### Test Frontend locally:
```bash
cd apps/web
pnpm dev
```

---

## 5. Troubleshooting

### Database Connection Issues:
- Serverless functions create new connections for each request
- Use connection pooling (Prisma Data Proxy or Supabase handles this automatically)
- Ensure `DATABASE_URL` and `DIRECT_URL` are correctly set

### CORS Errors:
- Verify `NEXT_PUBLIC_WEB_URL` is set in API environment variables
- Check that frontend URL matches exactly (including https://)
- Redeploy API after changing environment variables

### Cold Starts:
- First request after inactivity may be slower (normal for serverless)
- Consider upgrading to Vercel Pro for better performance

---

## 6. Continuous Deployment

Both projects are now set up for automatic deployment:
- Push to your main branch → Vercel automatically deploys both projects
- Pull requests → Vercel creates preview deployments
- Each app deploys independently based on changes in its directory

