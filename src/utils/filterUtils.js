export const applyFilters = (invoices, filters) => {
  return invoices.filter(invoice => {
    // Filtro per data
    if (filters.dataInizio) {
      const invoiceDate = new Date(invoice.data);
      const filterDate = new Date(filters.dataInizio);
      if (invoiceDate < filterDate) return false;
    }
    
    if (filters.dataFine) {
      const invoiceDate = new Date(invoice.data);
      const filterDate = new Date(filters.dataFine);
      if (invoiceDate > filterDate) return false;
    }

    // Filtro per fornitore
    if (filters.fornitore && filters.fornitore.trim() !== '') {
      const nomeFornitore = invoice.cedente?.nome?.toLowerCase() || '';
      const filterFornitore = filters.fornitore.toLowerCase();
      if (!nomeFornitore.includes(filterFornitore)) return false;
    }

    // Filtro per stato (solo per storico)
    if (filters.stato && filters.stato !== 'tutti') {
      if (invoice.stato !== filters.stato) return false;
    }

    return true;
  });
};

export const getUniqueSuppliers = (invoices) => {
  const suppliers = invoices
    .map(inv => inv.cedente?.nome)
    .filter(Boolean);
  return [...new Set(suppliers)].sort();
};