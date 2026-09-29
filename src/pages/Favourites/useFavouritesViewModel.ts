import { useCallback, useEffect, useState } from 'react'
import {
  deleteFavourite,
  loadFavourites,
} from './FavouritesModel'
import type { Movie } from '../../types/movie'

export function useFavouritesViewModel() {
  const [favourites, setFavourites] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadMovies = useCallback(async () => {
    setLoading(true)
    setError(null)

    try {
      const movies = await loadFavourites()
      setFavourites(movies)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load favourites'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

  const removeMovie = useCallback(async (imdbID: string) => {
    setLoading(true)
    setError(null)

    try {
      await deleteFavourite(imdbID)
      setFavourites((currentFavourites) =>
        currentFavourites.filter((movie) => movie.imdbID !== imdbID),
      )
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to remove favourite'
      setError(message)
    } finally {
      setLoading(false)
    }
  }, [])

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
