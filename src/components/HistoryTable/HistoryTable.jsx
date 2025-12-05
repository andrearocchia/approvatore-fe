import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import NoteModal from '../NoteModal/NoteModal';
import "./HistoryTable.scss";

function HistoryTable({ invoices, isFiltersActive, onResetFilters }) {
  const [noteModal, setNoteModal] = useState({
    isOpen: false,
    note: null,
  });

  const handleNoteClick = (note) => {
    if (note) {
      setNoteModal({ isOpen: true, note });
    }
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
        <div className="table-scroll">
          <table className="invoice-table">
            <thead>
              <tr>
                 {/*<th>Id</th>*/}
                <th>Numero</th>
                <th>Data</th>
                <th>Fornitore</th>
                <th>Totale</th>
                <th>Stato</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="8" style={{ textAlign: "center", padding: "20px" }}>
                    Nessuna fattura trovata nello storico
                  </td>
                </tr>
              )}
              {invoices.map((inv) => (
                <tr key={inv.id} className={`row-status-${inv.stato}`}>
                  {/*<td data-label="Codice Unico">{inv.id}</td>*/}
                  <td data-label="Numero:">{inv.numero || "—"}</td>
                  <td data-label="Data:">{inv.data ? new Date(inv.data).toLocaleDateString("it-IT") : "—"}</td>
                  <td data-label="Fornitore:">{inv.cedente?.nome || "N/A"}</td>
                  <td data-label="Totale:" className='totale'>{inv.totale || "—"}</td>
                  <td data-label="Stato:">{inv.stato}</td>
                  <td 
                    data-label="Note" 
                    onClick={() => handleNoteClick(inv.note)}
                    style={{ cursor: inv.note ? 'pointer' : 'default' }}
                  >
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="icon-note"
                      style={{ color: inv.note ? "#007BFF" : "#ccc" }}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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