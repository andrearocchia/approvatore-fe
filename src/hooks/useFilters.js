import { useState } from 'react';
import { hasActiveFilters } from '../utils/filterUtils';

const initialFilters = {
  dataDa: '',
  dataA: '',
  numeroFattura: '',
  fornitore: '',
  stato: 'tutti'
};

/**
 * Hook per gestire i filtri
 */
export function useFilters() {
  const [filters, setFilters] = useState(initialFilters);

  const applyFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const resetFilters = () => {
    setFilters(initialFilters);
  };

  const isActive = hasActiveFilters(filters);

  return {
    filters,
    applyFilters,
    resetFilters,
    isActive
  };
}