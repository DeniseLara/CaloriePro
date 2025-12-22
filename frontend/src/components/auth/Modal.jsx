import "./Modal.css";
import { useState } from "react";
import { useAuthForm } from "../../hooks/useAuthForm";
import { useModal } from "../../context/ModalContext";
import { 
  overlayVariants, 
  modalVariants, 
  contentVariants 
} from "../ui/Animation/ModalAnimations";
import { motion, AnimatePresence } from "framer-motion";
import AuthForm from "./AuthForm";
import LoaderModal from '../ui/Loader/LoaderModal'

function Modal() {
  const { showModal, closeModal } = useModal()
  const [formType, setFormType] = useState('login'); // 'login' o 'signup'
  const { handleSubmit, loading, serverError } = useAuthForm();

  const switchToLogin = () => {
    setFormType('login');
  };

  const switchToSignUp = () => {
    setFormType('signup');
  };

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
            key={formType}
            variants={contentVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
          
          {loading ? (
            <LoaderModal />
          ) : (
            <AuthForm
              type={formType}
              onSwitch={formType === 'login' ? switchToSignUp : switchToLogin}
              handleSubmit={handleSubmit}
              isOpen={showModal}
              serverError={serverError}
          />
          )}
          </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}


export default Modal;