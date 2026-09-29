import { useEffect, useState } from 'react'
import { loadFavourites, saveFavourite } from '../Favourites/FavouritesModel'
import { getMovies, initialMovies } from './HomeModel'
import type { Movie } from '../../types/movie'

export function useHomeViewModel(searchQuery = '') {
  const [query, setQuery] = useState(searchQuery)
  const [movies, setMovies] = useState<Movie[]>([])
  const [favouriteIDs, setFavouriteIDs] = useState<Set<string>>(new Set())
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true

    async function loadInitialMovies() {
      setLoading(true)
      setError(null)

      try {
        const [results, favourites] = await Promise.all([
          searchQuery.trim() ? getMovies(searchQuery) : initialMovies(),
          loadFavourites(),
        ])

        if (active) {
          setMovies(results)
          setFavouriteIDs(new Set(favourites.map((movie) => movie.imdbID)))
        }
      } catch (err) {
        if (active) {
          const message = err instanceof Error ? err.message : 'Something went wrong'
          setError(message)
        }
      } finally {
        if (active) {
          setLoading(false)
        }
      }
    }

    void loadInitialMovies()

    return () => {
      active = false
    }
  }, [searchQuery])

  async function handleSearch() {
    setLoading(true)
    setError(null)

    try {
      const results = await getMovies(query)
      setMovies(results)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Something went wrong'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  async function addFavourite(movie: Movie) {
    setError(null)

    try {
      await saveFavourite(movie)
      setFavouriteIDs((currentIDs) => new Set(currentIDs).add(movie.imdbID))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add favourite'
      setError(message)
    }
  }

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    favouriteIDs,
    handleSearch,
    addFavourite,
  }
}
