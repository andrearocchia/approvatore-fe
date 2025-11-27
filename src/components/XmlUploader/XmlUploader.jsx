import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faDownload, faSpinner } from '@fortawesome/free-solid-svg-icons';
import './XmlUploader.css';

function XmlUploader() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pdfData, setPdfData] = useState(null);
  const [fileName, setFileName] = useState('');

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.xml')) {
      setError('Il file deve essere in formato XML');
      return;
    }

    setError(null);
    setLoading(true);
    setFileName(file.name);

    try {
      const xmlContent = await file.text();
      
      const response = await fetch('http://localhost:3000/invoices/xml-to-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ xmlContent }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Errore nella conversione');
      }

      setPdfData(result.pdf);
    } catch (err) {
      setError(err.message);
      setPdfData(null);
    } finally {
      setLoading(false);
    }
  };

  const downloadPDF = () => {
    const binary = atob(pdfData);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${fileName.replace('.xml', '.pdf')}`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const viewPDF = () => {
    const binary = atob(pdfData);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <div className="uploader-container">
      <div className="uploader-card">
        <h3>Converti Fattura XML in PDF</h3>
        
        <div className="upload-area">
          <label htmlFor="xml-input" className="upload-label">
            <FontAwesomeIcon icon={faUpload} className="upload-icon" />
            <span>Seleziona un file XML</span>
          </label>
          <input
            id="xml-input"
            type="file"
            accept=".xml"
            onChange={handleFileChange}
            disabled={loading}
            className="file-input"
          />
        </div>

        {loading && (
          <div className="status loading">
            <FontAwesomeIcon icon={faSpinner} spin /> Conversione in corso...
          </div>
        )}

        {error && (
          <div className="status error">
            ❌ {error}
          </div>
        )}

        {pdfData && !loading && (
          <div className="status success">
            ✓ Conversione completata
          </div>
        )}

        {pdfData && (
          <div className="action-buttons">
            <button onClick={viewPDF} className="btn btn-view">
              <FontAwesomeIcon icon={faDownload} /> Visualizza
            </button>
            <button onClick={downloadPDF} className="btn btn-download">
              <FontAwesomeIcon icon={faDownload} /> Scarica
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default XmlUploader;