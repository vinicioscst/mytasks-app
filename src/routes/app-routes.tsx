import { Route, Routes } from 'react-router'
import Home from '../pages/home'
import Login from '../pages/login'
import Register from '../pages/register'
import Dashboard from '../pages/dashboard'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/register'
        element={<Register />}
      />
      <Route
        path='/login'
        element={<Login />}
      />
      <Route
        path='/dashboard'
        element={<Dashboard />}
      />
    </Routes>
  )
}

export default AppRoutes
