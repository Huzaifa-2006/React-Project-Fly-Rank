import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import {
  get,
  getDatabase,
  ref,
  remove,
  set,
} from 'firebase/database'
import { getFirestore } from 'firebase/firestore'
import type { Movie } from '../types/movie'

const FAVOURITES_COLLECTION = 'favourites'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
}

const firebaseApp = initializeApp(firebaseConfig)

export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
export const database = getDatabase(firebaseApp)

function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unknown Firebase error'
}

export async function addFavourite(movie: Movie): Promise<void> {
  if (!movie.imdbID) {
    throw new Error('Cannot add a favourite without an imdbID')
  }

  try {
    await set(ref(database, `${FAVOURITES_COLLECTION}/${movie.imdbID}`), movie)
  } catch (error) {
    throw new Error(`Failed to add favourite movie: ${getErrorMessage(error)}`, {
      cause: error,
    })
  }
}

export async function removeFavourite(imdbID: string): Promise<void> {
  if (!imdbID.trim()) {
    throw new Error('Cannot remove a favourite without an imdbID')
  }

  try {
    await remove(ref(database, `${FAVOURITES_COLLECTION}/${imdbID}`))
  } catch (error) {
    throw new Error(`Failed to remove favourite movie: ${getErrorMessage(error)}`, {
      cause: error,
    })
  }
}

export async function getFavourites(): Promise<Movie[]> {
  try {
    const snapshot = await get(ref(database, FAVOURITES_COLLECTION))
    const favourites = snapshot.val() as Record<string, Movie> | null

    return favourites ? Object.values(favourites) : []
  } catch (error) {
    throw new Error(`Failed to load favourite movies: ${getErrorMessage(error)}`, {
      cause: error,
    })
  }
}
