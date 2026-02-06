'use client'

import Link from 'next/link'
import { useAuthStore } from '@/stores/auth'
import { ROUTES } from '@repo/constants'

const basePrimary =
  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl bg-(--accent) px-6 py-3 text-base font-semibold text-(--accent-foreground) transition-opacity hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-(--accent-muted) focus:ring-offset-2 focus:ring-offset-(--background) sm:px-8 sm:py-3.5'

const baseSecondary =
  'inline-flex min-h-[44px] min-w-[44px] items-center justify-center rounded-xl border border-(--border) bg-transparent px-6 py-3 text-base font-semibold text-(--foreground) transition-colors hover:bg-(--card) focus:outline-none focus:ring-2 focus:ring-(--ring) focus:ring-offset-2 focus:ring-offset-(--background) sm:px-8 sm:py-3.5'

export function LandingCta() {
  const authStatus = useAuthStore(state => state.authStatus)
  const isAuthenticated = authStatus === 'authenticated'

  if (isAuthenticated) {
    return (
      <Link href={ROUTES.APP_DASHBOARD} className={basePrimary}>
        Go to Dashboard
      </Link>
    )
  }

  return (
    <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-4">
      <Link href={ROUTES.AUTH_SIGNUP} className={basePrimary}>
        Get started
      </Link>
      <Link href={ROUTES.AUTH_LOGIN} className={baseSecondary}>
        Log in
      </Link>
    </div>
  )
}
