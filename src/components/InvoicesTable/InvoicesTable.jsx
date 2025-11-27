import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';
import { handleApprove, handleRejectClick } from '../../modules/invoiceActions';

import './InvoicesTable.css';

function InvoicesTable({ invoices, removeInvoice, openRejectModal, openConfirmModal, openInfoModal }) {
  return (
    <div className="table-page">
      <div className="table-container">
        <h2 className="table-title">Fatture</h2>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Data</th>
              <th>Tipo Doc.</th>
              <th>Fornitore</th>
              <th>P.IVA Fornitore</th>
              <th>Totale</th>
              <th>Imponibile</th>
              <th>IVA</th>
              <th>Azione</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td>{inv.numero}</td>
                <td>{inv.data}</td>
                <td>{inv.tipoDocumento}</td>
                <td>{inv.cedente?.nome || 'N/A'}</td>
                <td>{inv.cedente?.partitaIva || 'N/A'}</td>
                <td>{inv.totale} €</td>
                <td>{inv.imponibile} €</td>
                <td>{inv.aliquota}%</td>
                <td className="actions-cell">
                  <FontAwesomeIcon
                    icon={faInfo}
                    className="icon-info"
                    onClick={() => openInfoModal(inv.id)}
                    title="Visualizza dettagli"
                  />

                  <FontAwesomeIcon
                    icon={faCheck}
                    className="icon-approve"
                    onClick={() => handleApprove(inv.id, inv.numero, openConfirmModal)}
                    title="Approva"
                  />

                  <FontAwesomeIcon
                    icon={faTimes}
                    className="icon-reject"
                    onClick={() => handleRejectClick(inv.id, openRejectModal)}
                    title="Rifiuta"
                  />
                </td>
              </tr>
            ))}
          </tbody>

        </table>
      </div>
    </div>
  );
}

export default InvoicesTable;