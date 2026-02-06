'use client'

import { useEffect } from 'react'
import { useAuthStore } from '@/stores/auth'

/**
 * Runs once on mount to restore session from localStorage (calls fetchMe).
 * Add this inside the root layout so the auth store is hydrated before any
 * component needs user/authStatus.
 */
export function AuthHydration({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    useAuthStore.getState().fetchMe()
  }, [])
  return <>{children}</>
}
