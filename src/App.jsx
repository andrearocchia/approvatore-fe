import { useState } from 'react';
import Login from './components/Login/Login';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import RejectModal from './components/RejectModal/RejectModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';

import './App.css';

export default function App() {
  const [user, setUser] = useState(null);

  // stato fatture fittizie
  const [invoices, setInvoices] = useState([
    { id: 1, numero: 'FAT-001', data: '2025-01-01', cliente: 'Mario Rossi', importo: 120.50 },
    { id: 2, numero: 'FAT-002', data: '2025-01-03', cliente: 'ACME S.p.A.', importo: 980.00 },
    { id: 3, numero: 'FAT-003', data: '2025-01-10', cliente: 'Demo SRL', importo: 450.00 },
    { id: 4, numero: 'FAT-004', data: '2025-01-01', cliente: 'Mario Rossi', importo: 120.50 },
    { id: 5, numero: 'FAT-005', data: '2025-01-03', cliente: 'ACME S.p.A.', importo: 980.00 },
    { id: 6, numero: 'FAT-006', data: '2025-01-10', cliente: 'Demo SRL', importo: 450.00 }
  ]);

  // stato modale rifiuto
  const [modalInvoiceId, setModalInvoiceId] = useState(null);

  // stato modale conferma
  const [confirmModal, setConfirmModal] = useState({ isOpen: false, invoiceId: null, invoiceNumber: null });

  const handleLogin = (payload) => setUser(payload);
  const handleLogout = () => setUser(null);

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
          <>
            <InvoicesTable
              invoices={invoices}
              removeInvoice={removeInvoice}
              openRejectModal={openRejectModal}
              openConfirmModal={openConfirmModal}
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
          </>
        )}
      </main>
    </div>
  );
}