'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/stores/auth'

export default function SignupPage() {
  const router = useRouter()
  const { signup, loading, error, clearError } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignup = async () => {
    clearError()
    try {
      await signup(email, password)
      router.push('/app/dashboard')
    } catch {
      // error is set in store
    }
  }

  return (
    <main>
      <h1>Signup</h1>
      {error && <p style={{ color: 'crimson' }}>{error}</p>}
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={e => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button onClick={handleSignup} disabled={loading}>
        {loading ? 'Signing up...' : 'Signup'}
      </button>
    </main>
  )
}
