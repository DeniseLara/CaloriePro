import "./Modal.css";
import { useNavigate } from "react-router-dom";  // Para redirigir al dashboard
import PropTypes from "prop-types";
import ModalContainer from "./ModalContainer";
import { useAuthForm } from '../../custoomhooks/useAuthForm'

function Modal({ closeModal, showModal }) {
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