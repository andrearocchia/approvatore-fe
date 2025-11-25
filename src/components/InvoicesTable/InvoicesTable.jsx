import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import './InvoicesTable.css';

function InvoicesTable({ invoices = [] }) {
  return (
    <div className="table-page">
      <div className="table-container">
        <h2 className="table-title">Fatture da elaborare</h2>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Importo</th>
              <th>Azione</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.numero}</td>
                <td>{inv.data}</td>
                <td>{inv.cliente}</td>
                <td>{inv.importo} €</td>
                <td className="actions-cell">
                  <FontAwesomeIcon icon={faCheck} className="icon-approve" />
                  <FontAwesomeIcon icon={faTimes} className="icon-reject" />
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
