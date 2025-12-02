import "./HistoryTable.scss";

function HistoryTable({ invoices }) {
  const formatCurrency = (value) => {
    if (!value) return "0.00";
    const num = typeof value === "string" ? parseFloat(value) : value;
    return isNaN(num) ? "0.00" : num.toFixed(2);
  };

  return (
    <div className="table-page">
      <div className="table-container">
        <h2 className="table-title">Storico Fatture</h2>

        <div className="table-scroll">
          <table className="invoice-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Numero</th>
                <th>Data</th>
                <th>Tipo Doc.</th>
                <th>Fornitore</th>
                <th>P.IVA</th>
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
                <tr 
                  key={inv.id} 
                  className={`row-status-${inv.stato}`}
                >
                  <td>{inv.id}</td>
                  <td>{inv.numero || "—"}</td>
                  <td>{inv.data ? new Date(inv.data).toLocaleDateString("it-IT") : "—"}</td>
                  <td>{inv.tipoDocumento || "—"}</td>
                  <td>{inv.cedente?.nome || "N/A"}</td>
                  <td>{inv.cedente?.partitaIva || "N/A"}</td>
                  <td>{formatCurrency(inv.totale)} €</td>
                  <td>{inv.stato}</td>
                  <td>{inv.note || "—"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default HistoryTable;