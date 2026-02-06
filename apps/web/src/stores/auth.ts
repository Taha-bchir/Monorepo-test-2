'use client'

import { create } from 'zustand'
import {
  getMe,
  postAuthLogin,
  postAuthSignup,
  setAuthToken,
  clearAuthToken,
  type AuthUser,
} from '@/src/lib/api-client'

export type { AuthUser }

export type AuthStatus =
  | 'idle'
  | 'loading'
  | 'authenticated'
  | 'unauthenticated'
  | 'error'

type AuthState = {
  user: AuthUser | null
  authStatus: AuthStatus
  loading: boolean
  error: string | null
}

type AuthActions = {
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  signup: (email: string, password: string) => Promise<void>
  fetchMe: () => Promise<void>
  clearError: () => void
}

const initialState: AuthState = {
  user: null,
  authStatus: 'idle',
  loading: false,
  error: null,
}

export const useAuthStore = create<AuthState & AuthActions>((set) => ({
  ...initialState,

  login: async (email: string, password: string) => {
    set({ loading: true, error: null, authStatus: 'loading' })
    try {
      const { access_token, user } = await postAuthLogin(email, password)
      setAuthToken(access_token)
      set({ user, authStatus: 'authenticated', loading: false, error: null })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Login failed'
      set({
        user: null,
        authStatus: 'error',
        loading: false,
        error: message,
      })
      throw e
    }
  },

  logout: () => {
    clearAuthToken()
    set({
      user: null,
      authStatus: 'unauthenticated',
      error: null,
      loading: false,
    })
  },

  signup: async (email: string, password: string) => {
    set({ loading: true, error: null, authStatus: 'loading' })
    try {
      const { access_token, user } = await postAuthSignup(email, password)
      setAuthToken(access_token)
      set({ user, authStatus: 'authenticated', loading: false, error: null })
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Signup failed'
      set({
        user: null,
        authStatus: 'error',
        loading: false,
        error: message,
      })
      throw e
    }
  },

  fetchMe: async () => {
    const token =
      typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
    if (!token) {
      set({ authStatus: 'unauthenticated', loading: false })
      return
    }
    set({ loading: true, authStatus: 'loading', error: null })
    try {
      const { user } = await getMe()
      set({ user, authStatus: 'authenticated', loading: false, error: null })
    } catch {
      clearAuthToken()
      set({
        user: null,
        authStatus: 'unauthenticated',
        loading: false,
        error: null,
      })
    }
  },

  clearError: () => set({ error: null }),
}))
