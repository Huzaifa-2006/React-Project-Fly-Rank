import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './Header.css'

function Header() {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const trimmedQuery = query.trim()
    navigate(trimmedQuery ? `/?query=${encodeURIComponent(trimmedQuery)}` : '/')
  }

  return (
    <header className="header">
      <div className="header__inner">
        <nav className="header__nav" aria-label="Main">
          <Link to="/" className="header__link">
            Home
          </Link>
          <Link to="/favourites" className="header__link">
            Favourites
          </Link>
        </nav>
        <form className="header__search" onSubmit={handleSubmit}>
          <input
            type="search"
            className="header__input"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies…"
            aria-label="Search"
          />
          <button type="submit" className="header__button">
            Search
          </button>
        </form>
      </div>
    </header>
  )
}

export default Header
