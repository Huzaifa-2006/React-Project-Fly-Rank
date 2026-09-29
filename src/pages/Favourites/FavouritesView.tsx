import MovieCard from '../../components/MovieCard/MovieCard'
import { useFavouritesViewModel } from './useFavouritesViewModel'
import './FavouritesView.css'

function FavouritesView() {
  const { favourites, loading, error, removeMovie } = useFavouritesViewModel()

  return (
    <main className="favourites">
      <h1 className="favourites__heading">Favourites</h1>

      {loading && <p className="favourites__status">Loading favourites…</p>}
      {error && <p className="favourites__error">{error}</p>}

      {!loading && !error && favourites.length === 0 && (
        <p className="favourites__empty">You have not added any favourite movies yet.</p>
      )}

      {favourites.length > 0 && (
        <ul className="favourites__list">
          {favourites.map((movie) => (
            <MovieCard
              key={movie.imdbID}
              movie={movie}
              isFavourite
              onFavouriteClick={() => removeMovie(movie.imdbID)}
            />
          ))}
        </ul>
      )}
    </main>
  )
}

export default FavouritesView
