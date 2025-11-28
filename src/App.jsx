import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { registerUnauthorizedCallback, getInvoicesList, generateInvoicePDF } from "./api/apiClient";
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
  // GESTIONE MODALI UNIFICATA
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
      const result = await getInvoicesList();

      if (result.success) {
        setInvoices(result.invoices);
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

  const handleReject = (invoiceId) => {
    setRejectModal({ isOpen: true, invoiceId });
  };

  const handleConfirmReject = (reason) => {
    console.log("Rifiutata fattura:", rejectModal.invoiceId, "Motivo:", reason);
    removeInvoice(rejectModal.invoiceId);
    setRejectModal({ isOpen: false, invoiceId: null });
  };

  const handleApprove = (invoiceId, invoiceNumber, cedente) => {
    setConfirmModal({ isOpen: true, invoiceId, invoiceNumber, cedente });
  };

  const handleConfirmApprove = () => {
    console.log("Approvata fattura:", confirmModal.invoiceId);
    removeInvoice(confirmModal.invoiceId);
    setConfirmModal({ isOpen: false, invoiceId: null, invoiceNumber: null, invoiceCedente: null });
  };

  const handleViewInfo = async (invoiceId) => {
    const invoice = invoices.find(inv => inv.id === invoiceId);
    if (!invoice) return;

    try {
      const result = await generateInvoicePDF(invoice);
      openPDFFromBase64(result.pdf);
    } catch (err) {
      console.error('Errore nella generazione PDF:', err);
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
            {loading ? (
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