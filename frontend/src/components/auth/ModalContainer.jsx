import "./Modal.css";
import PropTypes from "prop-types";
import { motion, AnimatePresence } from "framer-motion";

import SignUpForm from "./SignUpForm";
import LoginForm from "./LoginForm";
import LoadingOverlay from "../ui/Loader/LoadingOverlay";

function ModalContainer({ showModal, closeModal, step, loading, error, formProps }) {
  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
  };

  const contentVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } },
  };

  const renderStep = () => {
    if (loading) return <LoadingOverlay />
    switch (step) {
      case 1:
        return <SignUpForm {...formProps} error={error} />
      case 2:
        return <LoginForm {...formProps} error={error} />
      default:
        return null
    }
  }


  return (
    <AnimatePresence>
      {showModal && (
        <motion.div
          className="modal modal-show"
          initial="hidden"
          animate="visible"
          exit="exit"
          variants={modalVariants}
        >
        <motion.div
          className="modal-overlay"
          onClick={closeModal}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
        <motion.div
          className="modal-content"
          id="get-started"
          role="dialog"
          variants={contentVariants}
          aria-modal="true"
          aria-labelledby="modal-title"
          aria-describedby="modal-desc"
        >
          <span className="close" onClick={closeModal}>
            &times;
          </span>

          {renderStep()}
        </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

ModalContainer.propTypes = {
  showModal: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  step: PropTypes.number.isRequired,
  loading: PropTypes.bool,
  error: PropTypes.string,
  formProps: PropTypes.object.isRequired,
};

export default ModalContainer;
