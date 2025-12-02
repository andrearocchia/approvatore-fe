import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';
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
                <tr key={inv.id} className={`row-status-${inv.stato}`}>
                  <td data-label="Codice Unico">{inv.id}</td>
                  <td data-label="Numero">{inv.numero || "—"}</td>
                  <td data-label="Data">{inv.data ? new Date(inv.data).toLocaleDateString("it-IT") : "—"}</td>
                  <td data-label="Tipo Doc.">{inv.tipoDocumento || "—"}</td>
                  <td data-label="Fornitore">{inv.cedente?.nome || "N/A"}</td>
                  <td data-label="P.IVA Fornitore">{inv.cedente?.partitaIva || "N/A"}</td>
                  <td data-label="Totale">{formatCurrency(inv.totale)} €</td>
                  <td data-label="Stato">{inv.stato}</td>
                  <td data-label="Note">
                    {inv.note ? (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="icon-note"
                        style={{ color: "#007BFF" }} // Colorato se c'è la nota
                      />
                    ) : (
                      <FontAwesomeIcon
                        icon={faCircle}
                        className="icon-note"
                      />
                    )}
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

export default HistoryTable;