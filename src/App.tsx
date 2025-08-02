import { Route, Routes } from 'react-router'
import './App.css'
import { Dashboard } from './pages/dashboard'
import Login from './pages/login'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Dashboard />} />
    </Routes>
  )
}

export default App
