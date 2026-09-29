// This file will contain communication with the OMDb API.

import type { Movie, OmdbSearchResponse } from '../types/movie'

const API_URL = 'https://www.omdbapi.com/'

export async function searchMovies(query: string): Promise<Movie[]> {
  const apiKey = import.meta.env.VITE_OMDB_API_KEY

  if (!apiKey) {
    console.error('[OMDb] VITE_OMDB_API_KEY is missing or empty')
    throw new Error(
      'Missing VITE_OMDB_API_KEY. Add it to your .env file and restart the Vite dev server.',
    )
  }

  const url = `${API_URL}?apikey=${encodeURIComponent(apiKey)}&s=${encodeURIComponent(query)}`

  console.log('[OMDb] searchMovies called with query:', query)
  console.log('[OMDb] API key present:', Boolean(apiKey))

  const response = await fetch(url)

  console.log('[OMDb] HTTP status:', response.status)

  if (!response.ok) {
    console.error('[OMDb] HTTP request failed:', response.status, response.statusText)
    throw new Error(`OMDb request failed with status ${response.status}`)
  }

  const data = (await response.json()) as OmdbSearchResponse

  console.log('[OMDb] raw response:', data)

  if (data.Response === 'False') {
    console.error('[OMDb] API returned False:', data.Error)
    throw new Error(data.Error ?? 'OMDb search returned no results')
  }

  const movies = data.Search as Movie[]
  console.log('[OMDb] movies returned:', movies)

  return movies
}
