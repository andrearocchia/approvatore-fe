import { useState } from 'react';
import Login from './components/Login/Login';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (payload) => setUser(payload);
  const handleLogout = () => setUser(null);

  return (
    <div className="app-container">
      <header className="app-header">

        {user && (
          <div className="app-user">
            <span className="app-username">Ciao, {user.username}</span>
            <button className="app-logout" onClick={handleLogout}>Logout</button>
          </div>
        )}
      </header>

      <main>
        {!user ? <Login onLogin={handleLogin} /> : <InvoicesTable />}
      </main>
    </div>
  );
}
