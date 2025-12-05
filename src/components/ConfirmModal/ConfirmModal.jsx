import { useState } from 'react';
import './ConfirmModal.scss';

export default function ConfirmModal({ isOpen, onClose, onConfirm, invoiceNumber, cedente }) {
  const [note, setNote] = useState('');

  if (!isOpen) return null;

  const handleConfirm = () => {
    const trimmedNote = note.trim();
    onConfirm(trimmedNote || undefined);
    setNote('');
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Conferma approvazione</h3>
        <div className='details'>
          <p>Fattura numero: <strong>{invoiceNumber}</strong></p>
          <p>Fornitore: <strong>{cedente || 'N/A'}</strong></p>
        </div>
        <textarea
          className="modal-textarea"
          placeholder="Note (facoltative)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Annulla</button>
          <button className="btn-confirm confirm-modal" onClick={handleConfirm}>Conferma</button>
        </div>
      </div>
    </div>
  );
}