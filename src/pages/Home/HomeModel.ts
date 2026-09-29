import { searchMovies } from '../../services/omdbMovieService'
import type { Movie } from '../../types/movie'

const INITIAL_SEARCH_KEYWORDS = [
  'Batman',
  'Avengers',
  'Harry Potter',
  'Star Wars',
  'Spider-Man',
  'Marvel',
  'Disney',
  'Matrix',
  'Lord of the Rings',
  'Fast',
  'Mission Impossible',
  'Pixar',
  'Horror',
  'Comedy',
  'Action',
]

const INITIAL_KEYWORD_COUNT = 5

function shuffle<T>(items: T[]): T[] {
  const shuffledItems = [...items]

  for (let index = shuffledItems.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1))
    ;[shuffledItems[index], shuffledItems[randomIndex]] = [
      shuffledItems[randomIndex],
      shuffledItems[index],
    ]
  }

  return shuffledItems
}

export async function initialMovies(): Promise<Movie[]> {
  const keywords = shuffle(INITIAL_SEARCH_KEYWORDS).slice(0, INITIAL_KEYWORD_COUNT)

  const movieResults = await Promise.all(keywords.map((keyword) => searchMovies(keyword)))
  const uniqueMovies = new Map<string, Movie>()

  for (const movies of movieResults) {
    for (const movie of movies) {
      uniqueMovies.set(movie.imdbID, movie)
    }
  }

  const shuffledMovies = shuffle([...uniqueMovies.values()])

  if (shuffledMovies.length < 20) {
    throw new Error('Could not load 20 unique movies')
  }

  return shuffledMovies.slice(0, 20)
}

export async function getMovies(query: string): Promise<Movie[]> {
  const cleanedQuery = query.trim()

  if (cleanedQuery.length < 2) {
    throw new Error('Search query must contain at least two characters')
  }

  return searchMovies(cleanedQuery)
}
