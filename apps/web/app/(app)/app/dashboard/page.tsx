'use client'

import { useAuthStore } from '@/stores/auth'
import { LogoutButton } from '@/src/components/LogoutButton'

export default function DashboardPage() {
  const { user } = useAuthStore()

  return (
    <main>
      <h1>Dashboard</h1>
      <p>Logged in as {user?.email ?? user?.id}</p>
      <LogoutButton />
    </main>
  )
}
