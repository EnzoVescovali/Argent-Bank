import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from '../layout/Home'
import Login from '../layout/Login'
import Profile from '../layout/Profile'
import ProtectedRoute from './ProtectedRoute'

function Router() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Router