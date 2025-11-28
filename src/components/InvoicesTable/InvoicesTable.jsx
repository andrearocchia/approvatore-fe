import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes, faInfo } from '@fortawesome/free-solid-svg-icons';

import './InvoicesTable.scss';

function InvoicesTable({ invoices, actions }) {
  return (
    <div className="table-page">
      <div className="table-container">
        <h2 className="table-title">Fatture</h2>
        <div className="table-scroll">
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
                  <td data-label="Numero">{inv.numero}</td>
                  <td data-label="Data">{inv.data}</td>
                  <td data-label="Tipo Doc.">{inv.tipoDocumento}</td>
                  <td data-label="Fornitore">{inv.cedente?.nome || 'N/A'}</td>
                  <td data-label="P.IVA Fornitore">{inv.cedente?.partitaIva || 'N/A'}</td>
                  <td data-label="Totale">{inv.totale} €</td>
                  <td data-label="Imponibile">{inv.imponibile} €</td>
                  <td data-label="IVA">{inv.aliquota}%</td>
                  <td className="actions-cell">
                    <FontAwesomeIcon
                      icon={faInfo}
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
    </div>
  );
}

export default InvoicesTable;