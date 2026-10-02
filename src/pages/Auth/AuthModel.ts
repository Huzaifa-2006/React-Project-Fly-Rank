import {
  loginUser,
  logoutUser,
  registerUser,
} from '../../services/authService'
import type { User } from 'firebase/auth'

function validateCredentials(email: string, password: string): string {
  if (!email.trim()) {
    return 'Email is required.'
  }

  if (!password) {
    return 'Password is required.'
  }

  if (password.length < 6) {
    return 'Password must be at least six characters long.'
  }

  return ''
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

export async function register(email: string, password: string): Promise<User> {
  const validationError = validateCredentials(email, password)

  if (validationError) {
    throw new Error(validationError)
  }

  return registerUser(normalizeEmail(email), password)
}

export async function login(email: string, password: string): Promise<User> {
  const validationError = validateCredentials(email, password)

  if (validationError) {
    throw new Error(validationError)
  }

  return loginUser(normalizeEmail(email), password)
}

export async function logout(): Promise<void> {
  return logoutUser()
}
