// Gestione della logica dei pulsanti ✔ e ✖

export function handleApprove(invoiceId, invoiceNumber, openConfirmModal) {
  // in futuro chiameremo API → approva fattura
  openConfirmModal(invoiceId, invoiceNumber);
}

export function handleRejectClick(invoiceId, openRejectModal) {
  openRejectModal(invoiceId);
}
