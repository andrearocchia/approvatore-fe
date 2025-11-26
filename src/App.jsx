import { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { registerUnauthorizedCallback } from "./api/apiClient";

import Login from './components/Login/Login';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import RejectModal from './components/RejectModal/RejectModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import InfoModal from './components/InfoModal/InfoModal';

import './App.css';
import fakeInvoices from "./assets/fakeInvoices.json";

export default function App() {
  const [user, setUser] = useState(null);

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
  // FATTURE FITTIZIE
  // ============================
  const [invoices, setInvoices] = useState(fakeInvoices);


  // ============================
  // MODALI
  // ============================
  const [modalInvoiceId, setModalInvoiceId] = useState(null);

  const [confirmModal, setConfirmModal] = useState({
    isOpen: false,
    invoiceId: null,
    invoiceNumber: null,
  });

  const [infoModal, setInfoModal] = useState({
    isOpen: false,
    invoice: null,
  });

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
    setInfoModal({ isOpen: true, invoice });
  };

  const closeInfoModal = () => {
    setInfoModal({ isOpen: false, invoice: null });
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
            <InvoicesTable
              invoices={invoices}
              removeInvoice={removeInvoice}
              openRejectModal={openRejectModal}
              openConfirmModal={openConfirmModal}
              openInfoModal={openInfoModal}
            />

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

            <InfoModal
              isOpen={infoModal.isOpen}
              onClose={closeInfoModal}
              invoice={infoModal.invoice}
            />
          </>
        )}
      </main>
    </div>
  );
}