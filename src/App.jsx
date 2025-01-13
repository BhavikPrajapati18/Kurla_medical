import './App.css'
import Cards from './components/SubComps/Cards'
import { Header , Footer } from './components'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { login , logout } from './store/authSlice'
import authService from './appwriteService/auth'
import { useState } from 'react'

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService.userAcitve()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }))
        } else {
          dispatch(logout());
        }
      })
      .finally(setLoading(false));
  }, []);

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <main>
        <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  ) : null
}

export default App
