import "./Modal.css";
import PropTypes from "prop-types";
import { useAuthForm } from '../../hooks/useAuthForm'

import ModalContainer from "./ModalContainer";

function Modal({ closeModal, showModal }) {
  const {
    email, setEmail,
    password, setPassword,
    formUserName, setFormUserName,
    step, setStep,
    loading,
    error,
    handleSignUp,
    handleLogin
  } = useAuthForm({ closeModal });

  const formProps = {
    email, setEmail,
    password, setPassword,
    formUserName, setFormUserName,
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