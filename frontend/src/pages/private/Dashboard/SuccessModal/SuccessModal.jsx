import  { useEffect } from 'react';
import './successModal.css'; 
import { IoCloseOutline } from "react-icons/io5";
import PropTypes from 'prop-types';

function SuccessModal ({ message, onClose }) {
  useEffect(() => {
    // Cerrar el modal después de 3 segundos
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    // Limpiar el timer cuando el componente se desmonte
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="modal-overlay-user">
      <div className="modal-content-user">
        <p>{message}</p>
        <button className="close-btn" onClick={onClose}><IoCloseOutline /></button>
      </div>
    </div>
  );
}

SuccessModal.propTypes = {
  message:PropTypes.string.isRequired,
  onClose:PropTypes.func.isRequired,
};

export default SuccessModal;
