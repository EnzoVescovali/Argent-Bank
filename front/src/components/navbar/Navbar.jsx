import React from 'react'
import logo from '../../assets/argentBankLogo.png'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle, faRightFromBracket } from '@fortawesome/free-solid-svg-icons'

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img src={logo} alt="Argent Bank Logo" />
      </Link>

      <div>
        {token ? (
          <>
            <Link className="main-nav-item" to="/profile">
              <FontAwesomeIcon icon={faUserCircle} />
              {user ? `${user.firstName} ${user.lastName}` : "Profile"}
            </Link>

            <button className="main-nav-item" onClick={handleLogout}>
              <FontAwesomeIcon icon={faRightFromBracket} />
              Sign Out
            </button>
          </>
        ) : (
          <Link className="main-nav-item" to="/login">
            <FontAwesomeIcon icon={faUserCircle} />
            Sign In
          </Link>
        )}
      </div>
    </nav>
  )
}

export default Navbar