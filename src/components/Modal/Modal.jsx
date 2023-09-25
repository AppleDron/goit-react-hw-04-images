import css from './Modal.module.css';
import React, { useEffect } from 'react';

const Modal = ({ closeModal, largeImageURL }) => {
  useEffect(() => {
    const handlePressEscape = e => {
      if (e.code === 'Escape') closeModal();
    };

    window.addEventListener('keydown', handlePressEscape);

    return () => {
      window.removeEventListener('keydown', handlePressEscape);
    };
  }, [closeModal]);

  return (
    <>
      <div className={css.Overlay} onClick={closeModal}>
        <div className={css.Modal}>
          <img src={largeImageURL} alt={largeImageURL} className={css.Image} />
        </div>
      </div>
    </>
  );
};

export default Modal;
