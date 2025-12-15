import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faFilePdf, faInfo } from '@fortawesome/free-solid-svg-icons';
import { formatDataScadenza } from '../../utils/invoiceUtils';
import NoteModal from '../NoteModal/NoteModal';
import './InvoicesTable.scss';

function InvoicesTable({ invoices, actions, isFiltersActive, onResetFilters }) {
  const [noteModal, setNoteModal] = useState({ isOpen: false, note: '' });

  const handleViewNotes = (note) => {
    setNoteModal({ isOpen: true, note });
  };

  return (
    <div className="table-page">
      <div className="table-container">
        <div className="table-header">
          <h2 className="table-title">Fatture in Attesa</h2>
          <button 
            className={`btn-reset-filters ${isFiltersActive ? 'visible' : ''}`}
            onClick={onResetFilters}
          >
            Resetta
          </button>
        </div>
        <div className="table-scroll invoice-table">
          <table className="invoice-table">
            <thead>
              <tr> 
                <th>Numero</th>
                <th>Data Emissione</th>
                <th>Fornitore</th>
                <th>Totale</th>
                <th>Data Scadenza</th>
                <th className="actions-th">Azione</th>
              </tr>
            </thead>
            <tbody>
              {invoices.length === 0 && (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
                    Nessuna fattura in attesa
                  </td>
                </tr>
              )}
              {invoices.map(inv => (
                <tr key={inv.id}>
                  <td data-label="Numero:">{inv.numero || '—'}</td>
                  <td data-label="Data Emissione:">
                    {inv.data ? new Date(inv.data).toLocaleDateString('it-IT') : '—'}
                  </td>
                  <td data-label="Fornitore:">{inv.cedente?.nome || 'N/A'}</td>
                  <td data-label="Totale:" className='totale'>{inv.totale || '—'}</td>
                  <td data-label="Data Scadenza:">{formatDataScadenza(inv)}</td>
                  <td className="actions-cell">
                    <FontAwesomeIcon
                      icon={faInfo}
                      className={`icon-notes ${inv.noteInInvio ? 'has-notes' : ''}`}
                      onClick={() => handleViewNotes(inv.noteInInvio || 'Nessuna nota disponibile')}
                      title={inv.noteInInvio ? 'Visualizza note' : 'Nessuna nota'}
                    />
                    <FontAwesomeIcon
                      icon={faFilePdf}
                      className="icon-info"
                      onClick={() => actions.onViewInfo(inv.id)}
                      title="Visualizza dettagli"
                    />
                    <FontAwesomeIcon
                      icon={faCheck}
                      className="icon-approve"
                      onClick={() => actions.onApprove(inv.id, inv.numero, inv.cedente?.nome)}
                      title="Approva"
                    />
                    <FontAwesomeIcon
                      icon={faTimes}
                      className="icon-reject"
                      onClick={() => actions.onReject(inv.id)}
                      title="Rifiuta"
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
        onClose={() => setNoteModal({ isOpen: false, note: '' })}
        note={noteModal.note}
      />
    </div>
  );
}

export default InvoicesTable;