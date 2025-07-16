import { Route, Routes } from 'react-router'
import Home from '../pages/home'
import Dashboard from '../pages/dashboard'
import { PublicRoute } from './public-route'
import { PrivateRoute } from './private-route'

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route
          path='/'
          element={<Home />}
        />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route
          path='/dashboard'
          element={<Dashboard />}
        />
      </Route>
    </Routes>
  )
}

export default AppRoutes
