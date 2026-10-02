import { useSearchParams } from 'react-router-dom'
import { useHomeViewModel } from './useHomeViewModel'
import MovieCard from '../../components/MovieCard/MovieCard'
import './HomeView.css'

function HomeView() {
  const [searchParams] = useSearchParams()
  const searchQuery = searchParams.get('query') ?? ''
  const { movies, loading, error, favouriteIDs, handleFavouriteClick } =
    useHomeViewModel(searchQuery)

  return (
    <main className="home">
      {loading && <p className="home__status">Loading…</p>}
      {error && <p className="home__error">{error}</p>}

      <ul className="home__list">
        {movies.map((movie) => (
          <MovieCard
            key={movie.imdbID}
            movie={movie}
            isFavourite={favouriteIDs.has(movie.imdbID)}
            onFavouriteClick={() => handleFavouriteClick(movie)}
          />
        ))}
      </ul>
    </main>
  )
}

export default HomeView
