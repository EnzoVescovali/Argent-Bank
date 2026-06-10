import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from "react-redux";
import { login } from "../../store/authSlice";

function SignInForm() {
  const dispatch = useDispatch();

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      const response = await fetch("http://localhost:3001/api/v1/user/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
      })

      const data = await response.json()

      if (response.ok) {
        dispatch(login(data.body.token))
        navigate("/profile")
      } else {
        setError("Email ou mot de passe incorrect")
      }

    } catch (error) {
      console.error(error)
      setError("Erreur serveur")
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <label>Email</label>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>

      <div className="input-wrapper">
        <label>Password</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>

      {error && <p>{error}</p>}

      <button type="submit">Sign In</button>
    </form>
  )
}

export default SignInForm