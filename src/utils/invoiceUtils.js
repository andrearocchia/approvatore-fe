/**
 * Ottiene la data di scadenza della fattura
 * @param {Object} invoice - Oggetto fattura
 * @returns {Date|null} - Data di scadenza o null
 */
export function getDataScadenza(invoice) {
  if (!invoice.dettagliPagamento || invoice.dettagliPagamento.length === 0) {
    return null;
  }
  return invoice.dettagliPagamento[0].dataScadenzaPagamento || null;
}

/**
 * Formatta la data di scadenza per la visualizzazione
 * @param {Object} invoice - Oggetto fattura
 * @returns {string} - Data formattata o "—"
 */
export function formatDataScadenza(invoice) {
  const data = getDataScadenza(invoice);
  return data ? new Date(data).toLocaleDateString('it-IT') : '—';
}

/**
 * Ordina le fatture per data di scadenza
 * @param {Array} invoices - Array di fatture
 * @returns {Array} - Array ordinato
 */
export function sortByDataScadenza(invoices) {
  return [...invoices].sort((a, b) => {
    const dateA = getDataScadenza(a);
    const dateB = getDataScadenza(b);
    
    if (!dateA && !dateB) return 0;
    if (!dateA) return 1;
    if (!dateB) return -1;
    
    return new Date(dateA) - new Date(dateB);
  });
}