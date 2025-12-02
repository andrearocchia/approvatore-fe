import { useState } from 'react';
import './RejectModal.scss';

export default function RejectModal({ isOpen, onClose, onConfirm }) {
  const [reason, setReason] = useState('');

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!reason.trim()) return;
    onConfirm(reason);
    setReason('');
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Motivazione rifiuto</h3>
        <textarea
          className="modal-textarea"
          placeholder="Inserisci la motivazione del rifiuto..."
          value={reason}
          onChange={(e) => setReason(e.target.value)}
        />
        <div className="modal-actions">
          <button className="btn-cancel" onClick={onClose}>Annulla</button>
          <button className="btn-confirm reject-modal" disabled={!reason.trim()} onClick={handleSubmit}>Conferma</button>
        </div>
      </div>
    </div>
  );
}
