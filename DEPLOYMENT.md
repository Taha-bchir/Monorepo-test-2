# Deployment Guide (Vercel + GitHub)

This guide explains how to deploy this Turborepo monorepo to Vercel using GitHub.

## Prerequisites

1.  **GitHub Repository**: Push this project to a GitHub repository.
2.  **Vercel Account**: Sign up at [vercel.com](https://vercel.com).

## 1. Deploying the Frontend (`apps/web`)

The `apps/web` package is a Next.js application and is fully optimized for Vercel.

1.  **Go to Vercel Dashboard**: Click **"Add New..."** > **"Project"**.
2.  **Import Git Repository**: Select your GitHub repository.
3.  **Configure Project**:
    *   **Project Name**: Enter a name (e.g., `my-turbo-web`).
    *   **Framework Preset**: Select **Next.js**.
    *   **Root Directory**: Click "Edit" and select `apps/web`.
        *   *Note: This is critical. Vercel needs to know the app lives in a subdirectory.*
4.  **Build Settings**:
    *   Vercel usually auto-detects these for Next.js in a monorepo.
    *   If customization is needed:
        *   **Build Command**: `cd ../.. && npx turbo build --filter=web` (or rely on default).
        *   **Install Command**: `pnpm install` (Vercel detects `pnpm-lock.yaml`).
5.  **Environment Variables**:
    *   Copy values from `apps/web/.env.local` to Vercel's **Environment Variables** section.
6.  **Deploy**: Click **Deploy**.

## 2. Deploying the Backend (`apps/api`)

**Important Note**: Your `apps/api` is currently configured as a long-running Node.js server (using `@hono/node-server`), which is typically deployed to platforms like **Render**, **Railway**, or a VPS (e.g., DigitalOcean).

Vercel is primarily for frontend and serverless functions. While you *can* deploy Node APIs to Vercel, it often requires adapting the entry point to be a Serverless Function (exporting a handler) rather than calling `serve()` directly.

**If you must deploy the API to Vercel without code changes:**

1.  Follow the same steps as above but select `apps/api` as the **Root Directory**.
2.  Vercel may attempt to build it, but since `serve()` starts a permanent listening process, it might timeout or fail standard Serverless checks unless adapted.
3.  **Recommended**: Deploy the API to a service that supports long-running processes (e.g., Render Web Service) and provide the URL to your Frontend as an environment variable (`NEXT_PUBLIC_API_URL`).

## 3. Post-Deployment

1.  Once `apps/web` is deployed, get its production URL (e.g., `https://my-turbo-web.vercel.app`).
2.  If your API is deployed separately, ensure your Web app points to it via Environment Variables in the Vercel dashboard.
