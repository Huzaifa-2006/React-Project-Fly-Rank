import { Navigate, Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import { useAuthContext } from './context/useAuthContext'
import AuthView from './pages/Auth/AuthView'
import FavouritesView from './pages/Favourites/FavouritesView'
import HomeView from './pages/Home/HomeView'

function AuthRoute() {
  const { user, authLoading } = useAuthContext()

  if (authLoading) {
    return <p>Loading authentication…</p>
  }

  return user ? <Navigate to="/" replace /> : <AuthView />
}

function ProtectedFavouritesRoute() {
  const { user, authLoading } = useAuthContext()

  if (authLoading) {
    return <p>Loading authentication…</p>
  }

  return user ? <FavouritesView /> : <Navigate to="/auth" replace />
}

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/auth" element={<AuthRoute />} />
        <Route path="/favourites" element={<ProtectedFavouritesRoute />} />
      </Routes>
    </>
  )
}

export default App
