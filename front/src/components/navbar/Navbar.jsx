import React from 'react'
import logo from '../../assets/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  return (
    <>
      <nav className="main-nav">
        <Link className="main-nav-logo" to="/">
          <img
            className="main-nav-logo-image"
            src={logo}
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <div>
          <Link className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        </div>
      </nav>
    </>
  )
}

export default Navbar
