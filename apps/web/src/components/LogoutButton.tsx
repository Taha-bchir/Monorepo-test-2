'use client'

import { useAuthStore } from '@/stores/auth'

export function LogoutButton() {
  const logout = useAuthStore(state => state.logout)
  return <button onClick={logout}>Logout</button>
}
