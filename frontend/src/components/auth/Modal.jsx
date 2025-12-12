import "./Modal.css";
import { useAuthForm } from '../../hooks/useAuthForm'
import { useModal } from "../../context/ModalContext";
import { 
  overlayVariants, 
  modalVariants, 
  contentVariants 
} from "../ui/Animation/ModalAnimations";
import { motion, AnimatePresence } from "framer-motion";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm"
import LoaderModal from "../ui/Loader/LoaderModal";


function Modal() {
  const {
    step,
    switchToLogin,
    switchToSignUp,
    handleSubmit,
    loading,
    serverError
  } = useAuthForm();
  const { showModal, closeModal } = useModal()

  const renderStep = () => {
    if (loading) return <LoaderModal />
    switch (step) {
      case 1:
        return (
          <SignUpForm 
            isOpen={showModal} 
            switchToLogin={switchToLogin}
            handleSubmit={handleSubmit}
            serverError={serverError}
          />
        )
      case 2:
        return (
          <LoginForm 
            isOpen={showModal} 
            switchToSignUp={switchToSignUp}
            handleSubmit={handleSubmit}
            serverError={serverError}
          />
        )
      default:
        return null
    }
  }

  return (
    <AnimatePresence mode="wait">
      {showModal && (
        <div className="modal modal-show">
          <motion.div
            className="modal-overlay"
            onClick={closeModal}
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.25 }}
          />
              
          <motion.div
            className="modal-content"
            id="get-started"
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <span className="close" onClick={closeModal}>
              &times;
            </span>
    
          <motion.div
            key={step}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {renderStep()}
          </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

export default Modal;