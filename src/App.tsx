import { Route, Routes } from 'react-router-dom'
import Header from './components/Header'
import FavouritesView from './pages/Favourites/FavouritesView'
import HomeView from './pages/Home/HomeView'

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/favourites" element={<FavouritesView />} />
      </Routes>
    </>
  )
}

export default App
