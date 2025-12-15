import { useState } from 'react';
import { getInvoicePdfUrl, updateInvoiceStatus } from "./api/apiClient";
import { applyFilters } from './utils/filterUtils';

import { useAuth } from './hooks/useAuth';
import { useStandByInvoices, useHistoryInvoices } from './hooks/useInvoices';
import { useFilters } from './hooks/useFilters';
import { useModal } from './hooks/useModal';

import Login from './components/Login/Login';
import AppHeader from './components/AppHeader/AppHeader';
import InvoicesTable from './components/InvoicesTable/InvoicesTable';
import HistoryTable from './components/HistoryTable/HistoryTable';
import RejectModal from './components/RejectModal/RejectModal';
import ConfirmModal from './components/ConfirmModal/ConfirmModal';
import FilterModal from './components/FilterModal/FilterModal';

import './App.scss';

export default function App() {
  // ===== HOOKS =====
  const { user, handleLogin, handleLogout } = useAuth();
  const { invoices, loading: loadingStandby, removeInvoice } = useStandByInvoices(user?.username);
  const { 
    invoices: historyInvoices, 
    loading: loadingHistory, 
    pagination,
    loadInvoices: loadHistoryInvoices,
    handlePageChange,
    handlePageSizeChange 
  } = useHistoryInvoices();
  const { filters, applyFilters: setFilters, resetFilters, isActive: isFiltersActive } = useFilters();
  
  // ===== STATE =====
  const [showHistory, setShowHistory] = useState(false);
  const [showFilterModal, setShowFilterModal] = useState(false);
  
  // Modali con hook riutilizzabile
  const rejectModal = useModal({ invoiceId: null });
  const confirmModal = useModal({ invoiceId: null, invoiceNumber: null, cedente: null });

  // ===== HANDLERS - Invoice Actions =====
  const handleReject = (invoiceId) => {
    rejectModal.openModal({ invoiceId });
  };

  const handleConfirmReject = async (reason) => {
    try {
      await updateInvoiceStatus(rejectModal.modalState.invoiceId, 'rifiutato', reason);
      removeInvoice(rejectModal.modalState.invoiceId);
      rejectModal.closeModal();
    } catch (error) {
      alert("Errore durante il rifiuto della fattura");
    }
  };

  const handleApprove = (invoiceId, invoiceNumber, cedente) => {
    confirmModal.openModal({ invoiceId, invoiceNumber, cedente });
  };

  const handleConfirmApprove = async (note) => {
    try {
      await updateInvoiceStatus(confirmModal.modalState.invoiceId, 'approvato', note);
      removeInvoice(confirmModal.modalState.invoiceId);
      confirmModal.closeModal();
    } catch {
      alert("Errore durante l'approvazione");
    }
  };

  const handleViewInfo = (invoiceId) => {
    const pdfUrl = getInvoicePdfUrl(invoiceId);
    window.open(pdfUrl, '_blank');
  };

  // ===== HANDLERS - Filters & History =====
  const handleApplyFilters = (newFilters) => {
    setFilters(newFilters);
    if (showHistory) {
      loadHistoryInvoices(1, newFilters);
    }
  };

  const handleResetFilters = () => {
    resetFilters();
    if (showHistory) {
      loadHistoryInvoices(1, {});
    }
  };

  const handleToggleHistory = (value) => {
    setShowHistory(value);
    if (value) {
      loadHistoryInvoices(1, filters);
    }
  };

  // ===== DERIVED STATE =====
  const loading = showHistory ? loadingHistory : loadingStandby;
  const displayedInvoices = showHistory ? historyInvoices : applyFilters(invoices, filters);
  
  const invoiceActions = {
    onApprove: handleApprove,
    onReject: handleReject,
    onViewInfo: handleViewInfo,
  };

  // ===== RENDER =====
  return (
    <div className="app-container">
      {user && (
        <AppHeader
          username={user.username}
          showHistory={showHistory}
          onToggleHistory={handleToggleHistory}
          onOpenFilter={() => setShowFilterModal(true)}
          onLogout={handleLogout}
        />
      )}

      <main>
        {!user ? (
          <Login onLogin={handleLogin} />
        ) : loading ? (
          <div style={{ textAlign: "center", padding: "2rem" }}>
            Caricamento...
          </div>
        ) : showHistory ? (
          <HistoryTable
            invoices={displayedInvoices}
            isFiltersActive={isFiltersActive}
            onResetFilters={handleResetFilters}
            pagination={pagination}
            onPageChange={(page) => handlePageChange(page, filters)}
            onPageSizeChange={(size) => handlePageSizeChange(size, filters)}
          />
        ) : (
          <>
            <InvoicesTable 
              invoices={displayedInvoices} 
              actions={invoiceActions}
              isFiltersActive={isFiltersActive}
              onResetFilters={handleResetFilters}
            />

            <ConfirmModal
              isOpen={confirmModal.modalState.isOpen}
              onClose={confirmModal.closeModal}
              onConfirm={handleConfirmApprove}
              invoiceNumber={confirmModal.modalState.invoiceNumber}
              cedente={confirmModal.modalState.cedente}
            />

            <RejectModal
              isOpen={rejectModal.modalState.isOpen}
              onClose={rejectModal.closeModal}
              onConfirm={handleConfirmReject}
            />
          </>
        )}
      </main>

      <FilterModal
        isOpen={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        onApply={handleApplyFilters}
        currentFilters={filters}
        showStatoFilter={showHistory}
      />
    </div>
  );
}