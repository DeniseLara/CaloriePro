import "./Modal.css";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";  // Para redirigir al dashboard
import { useAuthForm } from '../../hooks/useAuthForm'

import ModalContainer from "./ModalContainer";

const Modal = ({ closeModal, showModal }) => {
  const navigate = useNavigate();  // Usamos useNavigate para redirigir al dashboard
  const {
    email, setEmail,
    password, setPassword,
    userName, setUserName,
    step, setStep,
    loading,
    error,
    handleSignUp,
    handleLogin
  } = useAuthForm({ closeModal, navigate });

  const formProps = {
    email, setEmail,
    password, setPassword,
    userName, setUserName,
    handleSignUp,
    handleLogin,
    setStep
  };

  return (
    <ModalContainer
      showModal={showModal}
      closeModal={closeModal}
      step={step}
      loading={loading}
      error={error}
      formProps={formProps}
    />
  );
}

Modal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  showModal: PropTypes.bool.isRequired,
};

export default Modal;