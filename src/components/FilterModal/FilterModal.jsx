import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './FilterModal.scss';

function FilterModal({ isOpen, onClose, onApply, currentFilters, showStatoFilter = false }) {
  const [filters, setFilters] = useState({
    dataDa: '',
    dataA: '',
    numeroFattura: '',
    fornitore: '',
    stato: 'tutti'
  });

  // Inizializza i filtri con i valori correnti quando il modale si apre
  useEffect(() => {
    if (isOpen && currentFilters) {
      setFilters(currentFilters);
    }
  }, [isOpen, currentFilters]);

  const handleApply = () => {
    onApply(filters);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Filtra Fatture</h3>
          <button className="modal-close" onClick={onClose}>
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>

        <div className="modal-body">
          <div className="filter-group">
            <label>Data Da:</label>
            <input
              type="date"
              value={filters.dataDa}
              onChange={(e) => setFilters({ ...filters, dataDa: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <label>Data A:</label>
            <input
              type="date"
              value={filters.dataA}
              onChange={(e) => setFilters({ ...filters, dataA: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <label>Numero Fattura:</label>
            <input
              type="text"
              placeholder="Cerca numero fattura..."
              value={filters.numeroFattura}
              onChange={(e) => setFilters({ ...filters, numeroFattura: e.target.value })}
            />
          </div>

          <div className="filter-group">
            <label>Fornitore:</label>
            <input
              type="text"
              placeholder="Cerca fornitore..."
              value={filters.fornitore}
              onChange={(e) => setFilters({ ...filters, fornitore: e.target.value })}
            />
          </div>

          {showStatoFilter && (
            <div className="filter-group">
              <label>Stato:</label>
              <select
                value={filters.stato}
                onChange={(e) => setFilters({ ...filters, stato: e.target.value })}
              >
                <option value="tutti">Tutti</option>
                <option value="approvato">Approvato</option>
                <option value="rifiutato">Rifiutato</option>
              </select>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button className="btn-apply" onClick={handleApply}>Applica</button>
        </div>
      </div>
    </div>
  );
}

export default FilterModal;