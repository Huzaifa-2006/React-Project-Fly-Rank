import { useCallback, useEffect, useState } from 'react'
import { useAuthContext } from '../../context/useAuthContext'
import {
  deleteFavourite,
  loadFavourites,
} from './FavouritesModel'
import type { Movie } from '../../types/movie'

export function useFavouritesViewModel() {
  const { user } = useAuthContext()
  const [favourites, setFavourites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMovies = useCallback(async () => {
    setLoading(true)
    setError(null)

    if (!user) {
      setFavourites([])
      setLoading(false)
      return
    }

    try {
      const movies = await loadFavourites(user.uid)
      setFavourites(movies)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load favourites'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [user])

  const removeMovie = useCallback(async (imdbID: string) => {
    setLoading(true)
    setError(null)

    if (!user) {
      setError('You must be signed in to remove a favourite.')
      setLoading(false)
      return
    }

    try {
      await deleteFavourite(user.uid, imdbID)
      setFavourites((currentFavourites) =>
        currentFavourites.filter((movie) => movie.imdbID !== imdbID),
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove favourite'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    void loadMovies()
  }, [loadMovies])

  return {
    favourites,
    loading,
    error,
    loadMovies,
    removeMovie,
  }
}
