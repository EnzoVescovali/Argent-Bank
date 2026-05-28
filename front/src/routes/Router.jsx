import React from 'react'
import { Navigate, Routes, Route } from 'react-router-dom'
import Home from '../layout/Home'
import Login from '../layout/Login'
import Profile from '../layout/Profile'


function Router() {
  return (
    <>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/index.html" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    </>
  )
}

export default Router
