
import Register from './pages/Register'
import { BrowserRouter, Route,Routes } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import { AuthProvider } from './context/AuthProvider'
import { ProtectedRoute } from './components/ProtectedRoute'
import MyBookings from './pages/MyBookings'

const App = () => {
  return (
    
      <BrowserRouter>
      <AuthProvider>
          <Routes>
            <Route path='/' element = {<Home />} />
            <Route path='/register' element = {<Register />} />
            <Route path='/login' element = {<Login />} />
            <Route path='/mybookings' element = {
              <ProtectedRoute >
                <MyBookings />
              </ProtectedRoute>
            } />
          </Routes>
           </AuthProvider>
      </BrowserRouter>
   
  )
}

export default App