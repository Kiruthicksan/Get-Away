import Register from './pages/Register'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import MyBookings from './pages/MyBookings'
import MainNavbar from './components/navbar/MainNavbar'

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Routes with navbar */}
          <Route path='/*' element={
            <>
              <MainNavbar />
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/mybookings' element={
                  <ProtectedRoute>
                    <MyBookings />
                  </ProtectedRoute>
                } />
              </Routes>
            </>
          } />
          
          {/* Routes without navbar */}
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App