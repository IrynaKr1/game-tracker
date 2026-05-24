import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import styles from './ModalForm.module.scss';

function ModalForm ({ children, onClose }) {
  useEffect(() => {
    const handleKey = e => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return createPortal(
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={e => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose} aria-label='Close'>
          X
        </button>
        {children}
      </div>
    </div>,
    document.body
  );
}

export default ModalForm;
