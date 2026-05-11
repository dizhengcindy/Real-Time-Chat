import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'

import Navbar from './components/Navbar'
import { HomePage } from './pages/HomePage'
import { SignupPage } from './pages/SignupPage'
import { LoginPage } from './pages/LoginPage'
import { SettingsPage } from './pages/SettingsPage'
import { ProfilePage } from './pages/ProfilePage'
import { useAuthStore } from './store/useAuthStore'
import { Toaster } from 'react-hot-toast'

const ProtectedRoutes = () => {
  const { authUser } = useAuthStore()
  return authUser ? <Outlet /> : <Navigate to="/login" />
}

const PublicOnlyRoutes = () => {
  const { authUser } = useAuthStore()
  return !authUser ? <Outlet /> : <Navigate to="/" />
}

const App = () => {
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex justify-center items-center h-screen">
        <Loader className="animate-spin" />
      </div>
    )
  }

  return (
    <div>
      <Navbar />
      <Routes>
        <Route element={<ProtectedRoutes />}>
          <Route path="/"        element={<HomePage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        <Route element={<PublicOnlyRoutes />}>
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login"  element={<LoginPage />} />
        </Route>

        <Route path="/settings" element={<SettingsPage />} />
      </Routes>

      <Toaster />
    </div>
  )
}

export default App