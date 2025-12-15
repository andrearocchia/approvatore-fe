import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfo, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import NoteModal from '../NoteModal/NoteModal';
import "./HistoryTable.scss";

function HistoryTable({ 
  invoices, 
  isFiltersActive, 
  onResetFilters, 
  pagination, 
  onPageChange,
  onPageSizeChange 
}) {  
  const [noteModal, setNoteModal] = useState({
    isOpen: false,
    note: null,
  });

  const handleNoteClick = (note) => {
    if (note) {
      setNoteModal({ isOpen: true, note });
    }
  };

  const handlePreviousPage = () => {
    if (pagination.page > 1) {
      onPageChange(pagination.page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination.page < pagination.totalPages) {
      onPageChange(pagination.page + 1);
    }
  };

  const handlePageSizeSelect = (e) => {
    const newSize = parseInt(e.target.value, 10);
    onPageSizeChange(newSize);
  };

  const getDataScadenza = (invoice) => {
    if (!invoice.dettagliPagamento || invoice.dettagliPagamento.length === 0) {
      return '—';
    }
    const primaScadenza = invoice.dettagliPagamento[0].dataScadenzaPagamento;
    return primaScadenza ? new Date(primaScadenza).toLocaleDateString('it-IT') : '—';
  };

  return (
    <div className="table-page">
      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Storico Fatture</h2>
          <button 
            className={`btn-reset-filters ${isFiltersActive ? 'visible' : ''}`}
            onClick={onResetFilters}
          >Resetta
          </button>
        </div>
        <div className="table-scroll history-table">
          <table className="history-table">
            <thead>
              <tr>
                <th>Numero</th>
                <th>Data Emissione</th>
                <th>Fornitore</th>
                <th>Totale</th>
                <th>Data Scadenza</th>
                <th>Data elaborazione</th>
                <th>Stato</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: "center", padding: "20px" }}>
                    Nessuna fattura trovata nello storico
                  </td>
                </tr>
              )}
              {invoices.map((inv) => (
                <tr key={inv.id} className={`row-status-${inv.stato}`}>
                  <td data-label="Numero:">{inv.numero || "—"}</td>
                  <td data-label="Data Emissione:">{inv.data ? new Date(inv.data).toLocaleDateString("it-IT") : "—"}</td>
                  <td data-label="Fornitore:">{inv.cedente?.nome || "N/A"}</td>
                  <td data-label="Totale:" className='totale'>{inv.totale || "—"}</td>
                  <td data-label="Data Scadenza:">{getDataScadenza(inv)}</td>
                  <td data-label="Data elaborazione:">{inv.updatedAt ? new Date(inv.updatedAt).toLocaleDateString("it-IT") : "—"}</td>
                  <td data-label="Stato:">{inv.stato}</td>
                  <td 
                    data-label="Note" 
                    onClick={() => handleNoteClick(inv.note)}
                    style={{ cursor: inv.note ? 'pointer' : 'default' }}
                  >
                    <FontAwesomeIcon
                      icon={faInfo}
                      className="icon-note"
                      style={{ color: inv.note ? "#007BFF" : "#ccc" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {pagination && pagination.totalPages > 0 && (
          <div className="pagination">
            <select
              value={pagination.pageSize} 
              onChange={handlePageSizeSelect}
              className="pagination-select"
            >
              <option value="10">10 per pagina</option>
              <option value="15">15 per pagina</option>
              <option value="25">25 per pagina</option>
              <option value="50">50 per pagina</option>
              <option value="100">100 per pagina</option>
            </select>
            
            <button 
              onClick={handlePreviousPage} 
              disabled={pagination.page === 1}
              className="pagination-btn"
            >
              <FontAwesomeIcon icon={faChevronLeft} />
            </button>
            
            <span className="pagination-info">
              Pagina {pagination.page} di {pagination.totalPages} ({pagination.total} fatture)
            </span>
            
            <button 
              onClick={handleNextPage} 
              disabled={pagination.page === pagination.totalPages}
              className="pagination-btn"
            >
              <FontAwesomeIcon icon={faChevronRight} />
            </button>
          </div>
        )}
      </div>

      <NoteModal
        isOpen={noteModal.isOpen}
        onClose={() => setNoteModal({ isOpen: false, note: null })}
        note={noteModal.note}
      />
    </div>
  );
}

export default HistoryTable;