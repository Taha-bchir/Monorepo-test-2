import './globals.css'
import { AuthHydration } from '@/stores/AuthHydration'
import { Plus_Jakarta_Sans } from 'next/font/google'

const fontSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={fontSans.variable}>
      <body className="min-h-screen font-sans antialiased" suppressHydrationWarning>
        <AuthHydration>
          {children}
        </AuthHydration>
      </body>
    </html>
  )
}
