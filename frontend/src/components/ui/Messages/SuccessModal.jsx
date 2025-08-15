import './successModal.css'; 
import PropTypes from 'prop-types';
import  { useEffect } from 'react';
import { IoCloseOutline } from "react-icons/io5";

function SuccessModal({ message, onClose }) {
  useEffect(() => {
    // Cerrar el modal después de 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Limpia el timer cuando el componente se desmonta
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay-user">
      <div className="modal-content-user">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}>
          <IoCloseOutline />
        </button>
      </div>
    </div>
  );
}

SuccessModal.propTypes = {
  message:PropTypes.string.isRequired,
  onClose:PropTypes.func.isRequired,
};

export default SuccessModal;
