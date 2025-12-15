import { useState } from 'react';

/**
 * Hook riutilizzabile per gestire lo stato dei modali
 * @param {Object} initialState - Stato iniziale del modale
 * @returns {Object} - Stato e funzioni per gestire il modale
 */
export function useModal(initialState = {}) {
  const [modalState, setModalState] = useState({
    isOpen: false,
    ...initialState
  });

  const openModal = (data = {}) => {
    setModalState({ isOpen: true, ...data });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, ...initialState });
  };

  return {
    modalState,
    openModal,
    closeModal
  };
}