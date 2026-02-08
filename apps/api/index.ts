import { createApp } from './src/app.js'

// Create app instance for Vercel
const app = await createApp()

// Export the app directly - Vercel can handle Hono apps natively
export default app
