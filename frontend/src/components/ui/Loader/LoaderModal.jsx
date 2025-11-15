import "./LoaderModal.css";

function LoaderModal({ text = "Loading..." }) {
  return (
    <div className="modal-loader">
      <div className="modal-spinner"></div>
      <p>{text}</p>
    </div>
  );
}

export default LoaderModal;
