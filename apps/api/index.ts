import { Hono } from 'hono'
import { handle } from 'hono/vercel'
import { createApp } from './src/app.js'

// Create app instance synchronously for Vercel
let app: Hono | null = null

async function getApp() {
    if (!app) {
        app = await createApp()
    }
    return app
}

// Export the handler that Vercel expects
export default handle(await getApp())
