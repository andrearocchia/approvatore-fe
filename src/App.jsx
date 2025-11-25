import { useState } from 'react';
import Login from './components/Login/Login';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import './App.css';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLogin = (payload) => setUser(payload);
  const handleLogout = () => setUser(null);

  // Dati fittizi per testare la tabella
  const invoices = [
    { id: 1, numero: 'FAT-001', data: '2025-01-01', cliente: 'Mario Rossi', importo: 120.50 },
    { id: 2, numero: 'FAT-002', data: '2025-01-03', cliente: 'ACME S.p.A.', importo: 980.00 },
    { id: 3, numero: 'FAT-003', data: '2025-01-10', cliente: 'Demo SRL', importo: 450.00 },
    { id: 4, numero: 'FAT-004', data: '2025-01-01', cliente: 'Mario Rossi', importo: 120.50 },
    { id: 5, numero: 'FAT-005', data: '2025-01-03', cliente: 'ACME S.p.A.', importo: 980.00 },
    { id: 6, numero: 'FAT-006', data: '2025-01-10', cliente: 'Demo SRL', importo: 450.00 }
  ];

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
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <InvoicesTable invoices={invoices} />
        )}
      </main>
    </div>
  );
}
