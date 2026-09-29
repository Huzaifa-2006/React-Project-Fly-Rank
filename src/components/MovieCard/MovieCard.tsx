import type { Movie } from '../../types/movie'
import './MovieCard.css'

type MovieCardProps = {
  movie: Movie
  onFavouriteClick?: () => void | Promise<void>
  isFavourite?: boolean
}

function MovieCard({ movie, onFavouriteClick, isFavourite = false }: MovieCardProps) {
  return (
    <li className="movie-card">
      {movie.Poster && movie.Poster !== 'N/A' ? (
        <img
          className="movie-card__poster"
          src={movie.Poster}
          alt={`${movie.Title} poster`}
        />
      ) : (
        <div className="movie-card__poster movie-card__poster--empty">No poster</div>
      )}
      <div className="movie-card__content">
        <h2 className="movie-card__title">{movie.Title}</h2>
        <p className="movie-card__meta">
          {movie.Year} · {movie.Type}
        </p>
        <button
          type="button"
          className={`movie-card__favourite${isFavourite ? ' movie-card__favourite--active' : ''}`}
          aria-label={`${isFavourite ? 'Remove' : 'Add'} ${movie.Title} ${isFavourite ? 'from' : 'to'} favourites`}
          title={isFavourite ? 'Remove from favourites' : 'Add to favourites'}
          onClick={() => void onFavouriteClick?.()}
        >
          {isFavourite ? '★' : '☆'}
        </button>
      </div>
    </li>
  )
}

export default MovieCard
