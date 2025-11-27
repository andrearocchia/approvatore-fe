import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { registerUnauthorizedCallback } from "./api/apiClient";

import Login from './components/Login/Login';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import RejectModal from './components/RejectModal/RejectModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';

import './App.css';

export default function App() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  // ============================
  // CARICA TOKEN ALL'AVVIO
  // ============================
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        setUser({
          username: decoded.username,
          role: decoded.role,
          token,
        });
      } catch (err) {
        console.error("Token non valido. Logout eseguito.");
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    registerUnauthorizedCallback(() => {
      console.warn("Token scaduto o non valido. Logout automatico.");
      handleLogout();
    });
  }, []);

  // ============================
  // CARICA FATTURE DA XML
  // ============================
  useEffect(() => {
    if (user) {
      loadInvoices();
    }
  }, [user]);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const response = await fetch('http://localhost:3000/invoices/list');
      const result = await response.json();

      if (result.success) {
        setInvoices(result.invoices);
        console.log('✅ Fatture caricate:', result.invoices.length);
        console.log('✅ Fatture caricate:', result.invoices);
      } else {
        console.error('Errore nel caricare le fatture');
      }
    } catch (error) {
      console.error('Errore nel caricare le fatture:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // MODALI
  // ============================
  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    invoiceId: null,
    invoiceNumber: null,
  });

  const [modalInvoiceId, setModalInvoiceId] = useState(null);

  // ============================
  // LOGIN (dopo token in localStorage)
  // ============================
  const handleLogin = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    setUser({
      username: decoded.username,
      role: decoded.role,
      token,
    });
  };

  // ============================
  // LOGOUT
  // ============================
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  // ============================
  // LOGICA FATTURE
  // ============================
  const removeInvoice = (invoiceId) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
  };

  const openRejectModal = (invoiceId) => {
    setModalInvoiceId(invoiceId);
  };

  const closeRejectModal = () => {
    setModalInvoiceId(null);
  };

  const confirmReject = (reason) => {
    console.log("Rifiutata fattura:", modalInvoiceId, "Motivo:", reason);
    removeInvoice(modalInvoiceId);
    closeRejectModal();
  };

  const openConfirmModal = (invoiceId, invoiceNumber) => {
    setConfirmModal({ isOpen: true, invoiceId, invoiceNumber });
  };

  const closeConfirmModal = () => {
    setConfirmModal({ isOpen: false, invoiceId: null, invoiceNumber: null });
  };

  const handleConfirmApprove = () => {
    console.log("Approvata fattura:", confirmModal.invoiceId);
    removeInvoice(confirmModal.invoiceId);
    closeConfirmModal();
  };

  const openInfoModal = (invoiceId) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    // Genera PDF lato server da dati già in memoria
    fetch('http://localhost:3000/invoices/generate-pdf', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(invoice),
    })
      .then(res => res.json())
      .then(result => {
        const binary = atob(result.pdf);
        const bytes = new Uint8Array(binary.length);
        for (let i = 0; i < binary.length; i++) {
          bytes[i] = binary.charCodeAt(i);
        }
        const blob = new Blob([bytes], { type: 'application/pdf' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
      })
      .catch(err => console.error('Errore nella generazione PDF:', err));
  };

  // ============================
  // RENDER
  // ============================
  return (
    <div className="app-container">
      <header className="app-header">
        {user && (
          <div className="app-user">
            <span className="app-username">Ciao, {user.username}</span>
            <button className="app-logout" onClick={handleLogout}>
              Logout
            </button>
          </div>
        )}
      </header>

      <main>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : (
          <>
            {loading ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                Caricamento fatture...
              </div>
            ) : (
              <InvoicesTable
                invoices={invoices}
                removeInvoice={removeInvoice}
                openRejectModal={openRejectModal}
                openConfirmModal={openConfirmModal}
                openInfoModal={openInfoModal}
              />
            )}

            <ConfirmModal
              isOpen={confirmModal.isOpen}
              onClose={closeConfirmModal}
              onConfirm={handleConfirmApprove}
              invoiceNumber={confirmModal.invoiceNumber}
            />

            <RejectModal
              isOpen={modalInvoiceId !== null}
              onClose={closeRejectModal}
              onConfirm={confirmReject}
            />
          </>
        )}
      </main>
    </div>
  );
}