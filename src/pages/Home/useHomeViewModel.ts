import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/useAuthContext'
import { loadFavourites, saveFavourite } from '../Favourites/FavouritesModel'
import { getMovies, initialMovies } from './HomeModel'
import type { Movie } from '../../types/movie'

export function useHomeViewModel(searchQuery = '') {
  const navigate = useNavigate()
  const { user } = useAuthContext()
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
          user ? loadFavourites(user.uid) : Promise.resolve([]),
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
  }, [searchQuery, user])

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
      if (!user) {
        navigate('/favourites')
        return
      }

      await saveFavourite(user.uid, movie)
      setFavouriteIDs((currentIDs) => new Set(currentIDs).add(movie.imdbID))
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to add favourite'
      setError(message)
    }
  }

  function handleFavouriteClick(movie: Movie) {
    if (!user) {
      navigate('/favourites')
      return
    }

    void addFavourite(movie)
  }

  return {
    query,
    setQuery,
    movies,
    loading,
    error,
    favouriteIDs,
    handleSearch,
    handleFavouriteClick,
  }
}
