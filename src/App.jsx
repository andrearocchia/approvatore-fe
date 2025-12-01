import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { registerUnauthorizedCallback, getStandByInvoices, getInvoicePdf } from "./api/apiClient";
import { openPDFFromBase64 } from './utils/pdfUtils';

import Login from './components/Login/Login';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import RejectModal from './components/RejectModal/RejectModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';

import './App.scss';

export default function App() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  // ============================
  // GESTIONE MODALI
  // ============================
  const [rejectModal, setRejectModal] = useState({
    isOpen: false,
    invoiceId: null,
  });

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    invoiceId: null,
    invoiceNumber: null,
    cedente: null,
  });

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
  // CARICA FATTURE DA DB
  // ============================
  useEffect(() => {
    if (user) {
      loadInvoices();
    }
  }, [user]);

  const loadInvoices = async () => {
    setLoading(true);
    try {
      const result = await getStandByInvoices();

      if (result.success) {
        console.log('Fatture caricate:', result.invoices);
        setInvoices(result.invoices);
      } else {
        console.error('Errore nel caricare le fatture:', result.message);
      }
    } catch (error) {
      console.error('Errore nel caricare le fatture:', error);
    } finally {
      setLoading(false);
    }
  };

  // ============================
  // LOGICA FATTURE
  // ============================
  const removeInvoice = (invoiceId) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
  };

  const handleReject = (invoiceId) => {
    setRejectModal({ isOpen: true, invoiceId });
  };

  const handleConfirmReject = (reason) => {
    console.log("Rifiutata fattura:", rejectModal.invoiceId, "Motivo:", reason);
    // TODO: chiamare API per aggiornare stato a "rifiutato" con nota
    removeInvoice(rejectModal.invoiceId);
    setRejectModal({ isOpen: false, invoiceId: null });
  };

  const handleApprove = (invoiceId, invoiceNumber, cedente) => {
    setConfirmModal({ isOpen: true, invoiceId, invoiceNumber, cedente });
  };

  const handleConfirmApprove = () => {
    console.log("Approvata fattura:", confirmModal.invoiceId);
    // TODO: chiamare API per aggiornare stato a "approvato"
    removeInvoice(confirmModal.invoiceId);
    setConfirmModal({ isOpen: false, invoiceId: null, invoiceNumber: null, cedente: null });
  };

  const handleViewInfo = async (invoiceId) => {
    try {
      const result = await getInvoicePdf(invoiceId);
      
      if (result.success && result.pdf) {
        openPDFFromBase64(result.pdf);
      } else {
        console.error('PDF non trovato nella risposta');
        alert('PDF non trovato per questa fattura');
      }
    } catch (err) {
      console.error('Errore nel recupero PDF:', err);
      alert('Errore: PDF non trovato. Potrebbe non essere stato ancora generato.');
    }
  };

  // ============================
  // ACTIONS OBJECT
  // ============================
  const invoiceActions = {
    onApprove: handleApprove,
    onReject: handleReject,
    onViewInfo: handleViewInfo,
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
            {loading && invoices.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '2rem' }}>
                Caricamento fatture...
              </div>
            ) : (
              <InvoicesTable
                invoices={invoices}
                actions={invoiceActions}
              />
            )}

            <ConfirmModal
              isOpen={confirmModal.isOpen}
              onClose={() => setConfirmModal({ isOpen: false, invoiceId: null, invoiceNumber: null, cedente: null })}
              onConfirm={handleConfirmApprove}
              invoiceNumber={confirmModal.invoiceNumber}
              cedente={confirmModal.cedente}
            />

            <RejectModal
              isOpen={rejectModal.isOpen}
              onClose={() => setRejectModal({ isOpen: false, invoiceId: null })}
              onConfirm={handleConfirmReject}
            />
          </>
        )}
      </main>
    </div>
  );
}