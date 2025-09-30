import "./Modal.css";
import { useAuthForm } from '../../hooks/useAuthForm'
import { useModal } from "../../context/ModalContext";

import ModalContainer from "./ModalContainer";

function Modal() {
  const { closeModal } = useModal()
  const {
    handleChange,
    formData, 
    step, setStep,
    loading,
    error,
    handleSignUp,
    handleLogin
  } = useAuthForm({ closeModal });

  const formProps = {
    formData,
    handleChange,
    handleSignUp,
    handleLogin,
    setStep,
  };

  return (
    <ModalContainer
      step={step}
      loading={loading}
      error={error}
      formProps={formProps}
    />
  );
}

export default Modal;