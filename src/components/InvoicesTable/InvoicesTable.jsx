import './InvoicesTable.css';

function InvoicesTable({ invoices = [] }) {
  return (
    <div className="table-page">
      <div className="table-container">
        <h2 className="table-title">Fatture</h2>

        <table className="invoice-table">
          <thead>
            <tr>
              <th>Numero</th>
              <th>Data</th>
              <th>Cliente</th>
              <th>Importo</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.numero}</td>
                <td>{inv.data}</td>
                <td>{inv.cliente}</td>
                <td>{inv.importo} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default InvoicesTable;
