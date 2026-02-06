'use client'

import { useEffect } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'

const LOGIN_PATH = '/auth/login'

/**
 * Private layout: checks auth via store (session / me). Redirects to login if not authenticated.
 * Renders children only when authenticated.
 */
export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, loading, authStatus } = useAuthStore()

  useEffect(() => {
    useAuthStore.getState().fetchMe()
  }, [])

  useEffect(() => {
    if (loading) return
    const isUnauthenticated =
      authStatus === 'unauthenticated' || authStatus === 'idle'
    if (isUnauthenticated && !user) {
      const returnTo = pathname ? `?returnTo=${encodeURIComponent(pathname)}` : ''
      router.replace(`${LOGIN_PATH}${returnTo}`)
    }
  }, [loading, user, authStatus, router, pathname])

  if (loading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    )
  }

  if (!user) {
    return null
  }

  return <>{children}</>
}
