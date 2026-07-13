import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

function Transactions() {
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate();
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    async function fetchTransactions() {
      try {
        const response = await fetch("http://localhost:3001/api/v1/accounts/transactions", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 401) {
          navigate("/login");
          return;
        }

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}`);
        }

        const data = await response.json();
        setAccounts(data.body?.accounts || []);
      } catch (fetchError) {
        console.error("Transaction fetch error:", fetchError);
        setError("Impossible de charger les transactions pour le moment.");
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, [token, navigate]);

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>Transactions</h1>
        <p className="subtext">
          Voici les transactions du mois courant, groupées par compte.
        </p>
      </div>

      {loading && <p>Chargement des transactions...</p>}
      {error && <p className="error-message">{error}</p>}

      {!loading && !error && accounts.length === 0 && (
        <section className="account">
          <div className="account-content-wrapper">
            <h3 className="account-title">Aucune transaction trouvée</h3>
            <p className="account-amount-description">
              Aucune transaction n'a été retournée pour le mois courant.
            </p>
          </div>
        </section>
      )}

      {!loading && !error && accounts.map((account) => (
        <section className="account" key={account.accountId}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.accountName}</h3>
            <p className="account-amount-description">Compte id: {account.accountId}</p>
          </div>
          <div className="account-content-wrapper">
            {account.transactions && account.transactions.length > 0 ? (
              <table className="transaction-table">
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Description</th>
                    <th>Montant</th>
                    <th>Solde</th>
                  </tr>
                </thead>
                <tbody>
                  {account.transactions.map((transaction) => (
                    <tr key={transaction.id}>
                      <td>{transaction.date}</td>
                      <td>{transaction.description}</td>
                      <td>{transaction.amount?.toFixed(2)}€</td>
                      <td>{transaction.balance?.toFixed(2)}€</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="account-amount-description">
                Pas de transaction pour ce compte.
              </p>
            )}
          </div>
        </section>
      ))}

      <div className="account-content-wrapper cta">
        <Link className="transaction-button" to="/profile">
          Retour au profil
        </Link>
      </div>
    </main>
  );
}

export default Transactions;
