// Gestione della logica dei pulsanti ✔ e ✖

export function handleApprove(invoiceId, invoiceNumber, openConfirmModal) {
  // in futuro chiameremo API → approva fattura e cambia stato in db
  openConfirmModal(invoiceId, invoiceNumber);
}

export function handleRejectClick(invoiceId, openRejectModal) {
  // in futuro chiameremo API → rifiuta fattura e cambia stato in db
  openRejectModal(invoiceId);
}
