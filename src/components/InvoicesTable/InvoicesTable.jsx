import './InvoicesTable.css';

const sampleInvoices = [
  { id: 'IT2025-0001', date: '2025-10-01', customer: 'ACME Srl', amount: 1250.00, status: 'Inviata' },
  { id: 'IT2025-0002', date: '2025-10-03', customer: 'Beta Spa', amount: 240.50, status: 'In approvazione' },
  { id: 'IT2025-0003', date: '2025-10-05', customer: 'Gamma SRL', amount: 980.00, status: 'Approvata' },
];

export default function InvoicesTable({ invoices = sampleInvoices }) {
  return (
    <div className="invoices-container">
      <h2 className="invoices-title">Lista Fatture</h2>

      <div className="invoices-table-wrapper">
        <table className="invoices-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Data</th>
              <th>Cliente</th>
              <th className="text-right">Importo</th>
              <th>Stato</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.id}</td>
                <td>{inv.date}</td>
                <td>{inv.customer}</td>
                <td className="text-right">{inv.amount.toFixed(2)} €</td>
                <td>{inv.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
