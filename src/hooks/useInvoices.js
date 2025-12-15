import { useState, useEffect } from 'react';
import { getStandByInvoices, getProcessedInvoices } from '../api/apiClient';
import { sortByDataScadenza } from '../utils/invoiceUtils';

/**
 * Hook per gestire le fatture in attesa
 */
export function useStandByInvoices(username) {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadInvoices = async () => {
    if (!username) return;
    
    setLoading(true);
    try {
      const result = await getStandByInvoices(username);
      if (result.success) {
        setInvoices(sortByDataScadenza(result.invoices));
      }
    } catch (error) {
      console.error("Errore nel caricare le fatture:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (username) {
      loadInvoices();
    }
  }, [username]);

  const removeInvoice = (invoiceId) => {
    setInvoices(prev => prev.filter(inv => inv.id !== invoiceId));
  };

  return {
    invoices,
    loading,
    loadInvoices,
    removeInvoice
  };
}

/**
 * Hook per gestire lo storico fatture con paginazione
 */
export function useHistoryInvoices() {
  const [invoices, setInvoices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  });

  const loadInvoices = async (page = 1, filters = {}, pageSize = pagination.pageSize) => {
    setLoading(true);
    try {
      const result = await getProcessedInvoices(page, pageSize, filters);
      
      if (result.success) {
        setInvoices(result.data);
        setPagination({
          page: result.page,
          pageSize,
          total: result.total,
          totalPages: result.totalPages,
        });
      }
    } catch (error) {
      console.error("Errore storico:", error);
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage, filters) => {
    loadInvoices(newPage, filters, pagination.pageSize);
  };

  const handlePageSizeChange = (newPageSize, filters) => {
    loadInvoices(1, filters, newPageSize);
  };

  return {
    invoices,
    loading,
    pagination,
    loadInvoices,
    handlePageChange,
    handlePageSizeChange
  };
}