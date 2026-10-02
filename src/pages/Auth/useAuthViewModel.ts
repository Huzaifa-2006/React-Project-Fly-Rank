import { useState } from 'react'
import * as AuthModel from './AuthModel'
import type { AuthMode } from '../../types/auth'

export function useAuthViewModel() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mode, setMode] = useState<AuthMode>('login')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit() {
    if (loading) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      if (mode === 'login') {
        await AuthModel.login(email, password)
      } else {
        await AuthModel.register(email, password)
      }

      setPassword('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Authentication failed.')
    } finally {
      setLoading(false)
    }
  }

  function toggleMode() {
    setMode((currentMode) => (currentMode === 'login' ? 'register' : 'login'))
    setError(null)
  }

  return {
    email,
    setEmail,
    password,
    setPassword,
    mode,
    loading,
    error,
    handleSubmit,
    toggleMode,
  }
}
