import './ConfirmModal.scss';

export default function ConfirmModal({ isOpen, onClose, onConfirm, invoiceNumber, cedente }) {
  if (!isOpen) return null;

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Conferma approvazione</h3>
        <p>Approvare la fattura <strong>{invoiceNumber}</strong></p>
        <p>Fornitore: <strong>{cedente || 'N/A'}</strong></p>
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Annulla</button>
          <button className="btn-confirm confirm-modal" onClick={handleConfirm}>Conferma</button>
        </div>
      </div>
    </div>
  );
}