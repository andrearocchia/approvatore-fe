import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { 
  registerUnauthorizedCallback, 
  getStandByInvoices, 
  getAllInvoices,
  getInvoicePdf, 
  updateInvoiceStatus 
} from "./api/apiClient";

import { openPDFFromBase64 } from './utils/pdfUtils';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faClock, faList } from '@fortawesome/free-solid-svg-icons';

import Login from './components/Login/Login';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import HistoryTable from './components/HistoryTable/HistoryTable';

import RejectModal from './components/RejectModal/RejectModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';

import './App.scss';

export default function App() {
  const [user, setUser] = useState(null);
  const [invoices, setInvoices] = useState([]);
  const [historyInvoices, setHistoryInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const [showHistory, setShowHistory] = useState(false);

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
      } catch {
        localStorage.removeItem("token");
      }
    }
  }, []);

  useEffect(() => {
    registerUnauthorizedCallback(() => {
      handleLogout();
    });
  }, []);

  const handleLogin = () => {
    const token = localStorage.getItem("token");
    const decoded = jwtDecode(token);

    setUser({
      username: decoded.username,
      role: decoded.role,
      token,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

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
        setInvoices(result.invoices);
      }
    } catch (error) {
      console.error("Errore nel caricare le fatture:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadHistoryInvoices = async () => {
    setLoading(true);
    try {
      const result = await getAllInvoices();
      if (result.success) {
        setHistoryInvoices(result.invoices);
      }
    } catch (error) {
      console.error("Errore storico:", error);
    } finally {
      setLoading(false);
    }
  };

  const removeInvoice = (invoiceId) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
  };

  const handleReject = (invoiceId) => {
    setRejectModal({ isOpen: true, invoiceId });
  };

  const handleConfirmReject = async (reason) => {
    try {
      await updateInvoiceStatus(rejectModal.invoiceId, 'rifiutato', reason);
      removeInvoice(rejectModal.invoiceId);
      setRejectModal({ isOpen: false, invoiceId: null });
    } catch (error) {
      alert("Errore durante il rifiuto della fattura");
    }
  };

  const handleApprove = (invoiceId, invoiceNumber, cedente) => {
    setConfirmModal({ isOpen: true, invoiceId, invoiceNumber, cedente });
  };

  const handleConfirmApprove = async () => {
    try {
      await updateInvoiceStatus(confirmModal.invoiceId, 'approvato');
      removeInvoice(confirmModal.invoiceId);
      setConfirmModal({ isOpen: false, invoiceId: null, invoiceNumber: null, cedente: null });
    } catch {
      alert("Errore durante l'approvazione");
    }
  };

  const handleViewInfo = async (invoiceId) => {
    try {
      const result = await getInvoicePdf(invoiceId);
      if (result.success && result.pdf) {
        openPDFFromBase64(result.pdf);
      } else {
        alert("PDF non disponibile");
      }
    } catch {
      alert("Errore nel recupero del PDF");
    }
  };

  const invoiceActions = {
    onApprove: handleApprove,
    onReject: handleReject,
    onViewInfo: handleViewInfo,
  };

  return (
    <div className="app-container">
      <header className="app-header">
        {user && (
          <div className="app-user">
            <span className="app-username">Ciao, {user.username}</span>

            <div className="button-room">
              {showHistory ? (
                <button
                  className="back-button"
                  onClick={() => setShowHistory(false)}>
                  <FontAwesomeIcon icon={faList} />
                  <span className="invoice-list">Fatture</span>
                </button>
              ) : (
                <button
                  className="invoice-history"
                  onClick={() => {
                    setShowHistory(true);
                    loadHistoryInvoices();
                  }}>
                  <FontAwesomeIcon icon={faClock} />
                  <span className="invoice-history-text">Storico</span>
                </button>
              )}

              {/* Logout */}
              <button className="app-logout" onClick={handleLogout}>
                <FontAwesomeIcon icon={faUser} />
                <span className="app-logout-text">Logout</span>
              </button>

            </div>
          </div>
        )}
      </header>

      <main>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Caricamento...
          </div>
        ) : showHistory ? (
          <HistoryTable
            invoices={historyInvoices}
            onBack={() => setShowHistory(false)}
          />
        ) : (
          <>
            <InvoicesTable invoices={invoices} actions={invoiceActions} />

            <ConfirmModal
              isOpen={confirmModal.isOpen}
              onClose={() =>
                setConfirmModal({ isOpen: false, invoiceId: null, invoiceNumber: null, cedente: null })
              }
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
