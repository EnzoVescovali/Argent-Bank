import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from '../layout/Home'
import Login from '../layout/Login'
import Profile from '../layout/Profile'
import Transactions from '../layout/Transactions'
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

      <Route
        path="/transactions"
        element={
          <ProtectedRoute>
            <Transactions />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default Router