import ClipLoader from "react-spinners/ClipLoader";

const LoadingOverlay = ({text = "Loading...", size = 30, color = "#4fa94d" }) => {
  return (
    <div className="loading-overlay">
      <ClipLoader size={size} color={color} loading={true} />
      <p>{text}</p>
    </div>
  );
}
export default LoadingOverlay;
