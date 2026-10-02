import type { User } from 'firebase/auth'
import type { ReactNode } from 'react'

export type AuthMode = 'login' | 'register'

export type AuthCredentials = {
  email: string
  password: string
}

export type AuthState = {
  user: null
  loading: boolean
  error: string | null
}

export type AuthContextValue = {
  user: User | null
  authLoading: boolean
  logout: () => Promise<void>
}

export type AuthProviderProps = {
  children: ReactNode
}
