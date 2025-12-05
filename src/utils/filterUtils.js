export const applyFilters = (invoices, filters) => {
  return invoices.filter(invoice => {
    // Filtro per data
    if (filters.data) {
      const invoiceDate = new Date(invoice.data).toDateString();
      const filterDate = new Date(filters.data).toDateString();
      if (invoiceDate !== filterDate) return false;
    }

    // Filtro per numero fattura
    if (filters.numeroFattura && filters.numeroFattura.trim() !== '') {
      const numeroFattura = invoice.numero?.toLowerCase() || '';
      const filterNumero = filters.numeroFattura.toLowerCase();
      if (!numeroFattura.includes(filterNumero)) return false;
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

export const hasActiveFilters = (filters) => {
  return filters.data !== '' || 
    filters.numeroFattura !== '' || 
    filters.fornitore !== '' || 
    (filters.stato && filters.stato !== 'tutti');
};