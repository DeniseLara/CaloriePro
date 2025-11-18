import "./Modal.css";
import { motion, AnimatePresence } from "framer-motion";
import { useModal } from "../../context/ModalContext";
import { overlayVariants, modalVariants, contentVariants } from "../ui/Animation/ModalAnimations";
import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import LoaderModal from "../ui/Loader/LoaderModal";

function ModalContainer({ 
  step, 
  loading, 
  error, 
  formProps 
}) {
  const { showModal, closeModal } = useModal()

  const renderStep = () => {
    if (loading) return <LoaderModal />
    switch (step) {
      case 1:
        return <SignUpForm {...formProps} error={error} isOpen={showModal}/>
      case 2:
        return <LoginForm {...formProps} error={error} isOpen={showModal}/>
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

export default ModalContainer;
