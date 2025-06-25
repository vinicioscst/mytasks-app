import { Route, Routes } from 'react-router'
import Home from '../pages/home'
import Dashboard from '../pages/dashboard'

function AppRoutes() {
  return (
    <Routes>
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path='/dashboard'
        element={<Dashboard />}
      />
    </Routes>
  )
}

export default AppRoutes
