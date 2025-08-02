import { Route, Routes, useNavigate } from 'react-router'
import './App.css'
import { Dashboard } from './pages/dashboard'
import Login from './pages/login'
import { useSession } from './lib/supabase'
import { useEffect } from 'react'
import { ROUTES } from './lib/const'

function App() {

  const navigate = useNavigate();

  const session = useSession();

  useEffect(() => {
    if (!session) {
      navigate(ROUTES.LOGIN);
    }
  }, [session]);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}

export default App
