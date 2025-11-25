// Gestione della logica dei pulsanti ✔ e ✖

export function handleApprove(invoiceId, removeInvoice) {
  // in futuro chiameremo API → approva fattura
  
  removeInvoice(invoiceId); // per ora rimuovo la riga
}

export function handleRejectClick(invoiceId, openRejectModal) {
  openRejectModal(invoiceId); // segnala a App che deve aprire il modale
}
