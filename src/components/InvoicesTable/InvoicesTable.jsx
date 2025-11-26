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
              <th>external_ID</th>
              <th>Numero</th>
              <th>Data</th>
              <th>Stato</th>
              <th>Cliente</th>
              <th>Importo</th>
              <th>Iva</th>
              <th>Azione</th>
            </tr>
          </thead>

          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id}>
                <td>{inv.external_ID}</td>
                <td>{inv.numero}</td>
                <td>{inv.data}</td>
                <td>{inv.stato}</td>
                <td>{inv.cliente}</td>
                <td>{inv.importo} €</td>
                <td>{inv.iva}</td>
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