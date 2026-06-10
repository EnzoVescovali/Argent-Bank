import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser, logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Profile() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.user);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch("http://localhost:3001/api/v1/user/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erreur profile");
        }

        const data = await response.json();
        dispatch(setUser(data.body));
      } catch (error) {
        console.error(error);
        dispatch(logout());
        navigate("/login");
      }
    }

    if (token && !user) {
      fetchProfile();
    }
  }, [token, user, dispatch, navigate]);

  if (!user) return <p>Loading...</p>;

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {user.firstName} {user.lastName}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>

      <h2 className="sr-only">Accounts</h2>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>

      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  );
}

export default Profile;
