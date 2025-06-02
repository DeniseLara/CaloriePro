import ClipLoader from "react-spinners/ClipLoader";

function LoadingOverlay() {
  return (
    <div className="loading-overlay">
      <ClipLoader size={30} color="#4fa94d" loading={true} />
      <p>Loading...</p>
    </div>
  );
}
export default LoadingOverlay;
