import './NoteModal.scss';

export default function NoteModal({ isOpen, onClose, note }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3>Nota Fattura</h3>
        <div className="note-content">
          {note || "Nessuna nota disponibile"}
        </div>
        <div className="modal-actions">
          <button className="btn-close" onClick={onClose}>Chiudi</button>
        </div>
      </div>
    </div>
  );
}