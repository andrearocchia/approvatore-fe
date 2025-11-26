import './InfoModal.css';

export default function InfoModal({ isOpen, onClose, invoice }) {
  if (!isOpen || !invoice) return null;

  const cedente = invoice.cedente || {};
  const cessionario = invoice.cessionario || {};
  const documenti = invoice.documenti || [];
  const causali = invoice.causali || [];
  const righe = invoice.righe || [];
  const riepiloghi = invoice.riepiloghi || [];
  const pagamenti = invoice.pagamenti || [];

  return (
    <div className="info-modal-overlay" onClick={onClose}>
      <div className="info-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="info-modal-header">
          <h2>Dettagli Fattura {invoice.numero}</h2>
          <button className="info-modal-close" onClick={onClose}>×</button>
        </div>

        <div className="info-modal-body">
          {/* Container 1: Cedente e Cessionario */}
          <div className="info-container parties">
            <div className="party-section">
              <h3>Cedente/Prestatore</h3>
              <div className="party-grid">
                <div><strong>Identificativo fiscale:</strong> {cedente.identificativoFiscale || 'XXXXX'}</div>
                <div><strong>Codice fiscale:</strong> {cedente.codiceFiscale || 'XXXXX'}</div>
                <div><strong>Denominazione:</strong> {cedente.denominazione || 'XXXXX'}</div>
                <div><strong>Regime fiscale:</strong> {cedente.regimeFiscale || 'XXXXX'}</div>
                <div><strong>Indirizzo:</strong> {cedente.indirizzo || 'XXXXX'}</div>
                <div><strong>Comune:</strong> {cedente.comune || 'XXXXX'}</div>
                <div><strong>Cap:</strong> {cedente.cap || 'XXXXX'}</div>
                <div><strong>Telefono:</strong> {cedente.telefono || 'XXXXX'}</div>
                <div><strong>Email:</strong> {cedente.email || 'XXXXX'}</div>
              </div>
            </div>

            <div className="party-section">
              <h3>Cessionario/Committente</h3>
              <div className="party-grid">
                <div><strong>Identificativo fiscale:</strong> {cessionario.identificativoFiscale || 'XXXXX'}</div>
                <div><strong>Denominazione:</strong> {cessionario.denominazione || 'XXXXX'}</div>
                <div><strong>Indirizzo:</strong> {cessionario.indirizzo || 'XXXXX'}</div>
                <div><strong>Comune:</strong> {cessionario.comune || 'XXXXX'}</div>
              </div>
            </div>
          </div>

          {/* Container 2: Documenti */}
          <div className="info-container">
            <table className="info-table">
              <thead>
                <tr>
                  <th>Tipologia documento</th>
                  <th>Art.73</th>
                  <th>Numero documento</th>
                  <th>Data documento</th>
                  <th>Codice destinatario</th>
                </tr>
              </thead>
              <tbody>
                {documenti.length > 0 ? (
                  documenti.map((doc, idx) => (
                    <tr key={idx}>
                      <td>{doc.tipologia || 'XXXXX'}</td>
                      <td>{doc.art73 || 'XXXXX'}</td>
                      <td>{doc.numero || 'XXXXX'}</td>
                      <td>{doc.data || 'XXXXX'}</td>
                      <td>{doc.codiceDestinatario || 'XXXXX'}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="5">Nessun documento</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Container 3: Causale */}
          <div className="info-container">
            <table className="info-table">
              <thead>
                <tr>
                  <th>CAUSALE</th>
                </tr>
              </thead>
              <tbody>
                {causali.length > 0 ? (
                  causali.map((causale, idx) => (
                    <tr key={idx}>
                      <td>{causale || 'XXXXX'}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td>XXXXX</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Container 4: Righe */}
          <div className="info-container">
            <table className="info-table">
              <thead>
                <tr>
                  <th>Cod.articolo</th>
                  <th>Descrizione</th>
                  <th>Quantità</th>
                  <th>Prezzo unitario</th>
                  <th>UM</th>
                  <th>Sconto o magg.</th>
                  <th>%IVA</th>
                  <th>Prezzo totale</th>
                </tr>
              </thead>
              <tbody>
                {righe.length > 0 ? (
                  righe.map((riga, idx) => (
                    <tr key={idx}>
                      <td>{riga.codArticolo || 'XXXXX'}</td>
                      <td>{riga.descrizione || 'XXXXX'}</td>
                      <td>{riga.quantita || 'XXXXX'}</td>
                      <td>{riga.prezzoUnitario || 'XXXXX'}</td>
                      <td>{riga.um || 'XXXXX'}</td>
                      <td>{riga.scontoMagg || 'XXXXX'}</td>
                      <td>{riga.aliquotaIva || 'XXXXX'}</td>
                      <td>{riga.prezzoTotale || 'XXXXX'}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="8">Nessuna riga</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Container 5: Riepiloghi IVA e Totali */}
          <div className="info-container">
            <h3>RIEPILOGHI IVA e TOTALI</h3>
            <table className="info-table">
              <thead>
                <tr>
                  <th>Esigibilità IVA</th>
                  <th>%IVA</th>
                  <th>Spese accessorie</th>
                  <th>Arr.</th>
                  <th>Totale imponibile</th>
                  <th>Totale imposta</th>
                </tr>
              </thead>
              <tbody>
                {riepiloghi.length > 0 ? (
                  riepiloghi.map((rie, idx) => (
                    <tr key={idx}>
                      <td>{rie.esigibilita || 'XXXXX'}</td>
                      <td>{rie.percIva || 'XXXXX'}</td>
                      <td>{rie.speseAccessorie || 'XXXXX'}</td>
                      <td>{rie.arrotondamento || 'XXXXX'}</td>
                      <td>{rie.totaleImponibile || 'XXXXX'}</td>
                      <td>{rie.totaleImposta || 'XXXXX'}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="6">Nessun dato</td></tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Container 6: Pagamenti */}
          <div className="info-container">
            <table className="info-table">
              <thead>
                <tr>
                  <th>Modalità pagamento</th>
                  <th>Dettagli</th>
                  <th>Scadenza</th>
                  <th>Importo</th>
                </tr>
              </thead>
              <tbody>
                {pagamenti.length > 0 ? (
                  pagamenti.map((pag, idx) => (
                    <tr key={idx}>
                      <td>{pag.modalita || 'XXXXX'}</td>
                      <td>{pag.dettagli || 'XXXXX'}</td>
                      <td>{pag.scadenza || 'XXXXX'}</td>
                      <td>{pag.importo || 'XXXXX'}</td>
                    </tr>
                  ))
                ) : (
                  <tr><td colSpan="4">Nessun pagamento</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="info-modal-footer">
          <button className="btn-close" onClick={onClose}>Chiudi</button>
        </div>
      </div>
    </div>
  );
}