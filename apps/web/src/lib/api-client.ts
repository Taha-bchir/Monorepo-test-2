'use client'

/**
 * Central API client. Knows base URL from env and attaches auth (Bearer token).
 * All backend calls from the app should go through this client; stores use it,
 * components do not call fetch directly.
 */

const API_BASE =
  typeof window !== 'undefined'
    ? (process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000')
    : process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3000'

const AUTH_TOKEN_KEY = 'access_token'

function getToken(): string | null {
  if (typeof window === 'undefined') return null
  return localStorage.getItem(AUTH_TOKEN_KEY)
}

export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') localStorage.setItem(AUTH_TOKEN_KEY, token)
}

export function clearAuthToken(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(AUTH_TOKEN_KEY)
}

function defaultHeaders(extra?: HeadersInit): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(extra as Record<string, string>),
  }
  const token = getToken()
  if (token) headers['Authorization'] = `Bearer ${token}`
  return headers
}

async function handleResponse<T>(res: Response): Promise<T> {
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = (data as { error?: { message?: string } })?.error?.message ?? 'Request failed'
    throw new Error(message)
  }
  return data as T
}

// --- Typed types (from backend) ---

export type AuthUser = { id: string; email: string | null }

export type GetMeResponse = { user: AuthUser }

export type AuthResponse = { access_token: string; user: AuthUser }

// --- Typed helpers ---

export async function getMe(): Promise<GetMeResponse> {
  const res = await fetch(`${API_BASE}/api/v1/me`, {
    method: 'GET',
    headers: defaultHeaders(),
  })
  return handleResponse<GetMeResponse>(res)
}

export async function postAuthLogin(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/v1/auth/login`, {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify({ email, password }),
  })
  return handleResponse<AuthResponse>(res)
}

export async function postAuthSignup(
  email: string,
  password: string
): Promise<AuthResponse> {
  const res = await fetch(`${API_BASE}/api/v1/auth/signup`, {
    method: 'POST',
    headers: defaultHeaders(),
    body: JSON.stringify({ email, password }),
  })
  return handleResponse<AuthResponse>(res)
}

// --- Generic helpers for future endpoints ---

export async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'GET',
    headers: defaultHeaders(),
  })
  return handleResponse<T>(res)
}

export async function post<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: defaultHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  return handleResponse<T>(res)
}

export async function put<T>(path: string, body?: unknown): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'PUT',
    headers: defaultHeaders(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  })
  return handleResponse<T>(res)
}

export async function del<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`, {
    method: 'DELETE',
    headers: defaultHeaders(),
  })
  return handleResponse<T>(res)
}
