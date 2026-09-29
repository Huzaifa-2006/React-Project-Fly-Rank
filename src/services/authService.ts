import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  type Unsubscribe,
  type User,
} from 'firebase/auth'
import { auth } from './firebaseService'

function getAuthErrorMessage(error: unknown): string {
  if (typeof error === 'object' && error !== null && 'code' in error) {
    const code = String(error.code)

    switch (code) {
      case 'auth/email-already-in-use':
        return 'An account with this email already exists.'
      case 'auth/invalid-email':
        return 'Please enter a valid email address.'
      case 'auth/invalid-credential':
      case 'auth/invalid-login-credentials':
        return 'The email or password is incorrect.'
      case 'auth/weak-password':
        return 'Password must be at least 6 characters long.'
      case 'auth/user-disabled':
        return 'This account has been disabled.'
      case 'auth/too-many-requests':
        return 'Too many attempts. Please try again later.'
      default:
        break
    }
  }

  return error instanceof Error ? error.message : 'An authentication error occurred.'
}

export async function registerUser(email: string, password: string): Promise<User> {
  try {
    const credential = await createUserWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (error) {
    throw new Error(`Registration failed: ${getAuthErrorMessage(error)}`, {
      cause: error,
    })
  }
}

export async function loginUser(email: string, password: string): Promise<User> {
  try {
    const credential = await signInWithEmailAndPassword(auth, email, password)
    return credential.user
  } catch (error) {
    throw new Error(`Login failed: ${getAuthErrorMessage(error)}`, {
      cause: error,
    })
  }
}

export async function logoutUser(): Promise<void> {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(`Logout failed: ${getAuthErrorMessage(error)}`, {
      cause: error,
    })
  }
}

export function subscribeToAuthChanges(
  callback: (user: User | null) => void,
): Unsubscribe {
  try {
    return onAuthStateChanged(auth, callback)
  } catch (error) {
    throw new Error(`Auth subscription failed: ${getAuthErrorMessage(error)}`, {
      cause: error,
    })
  }
}
