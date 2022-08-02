import { ImSpinner2 } from "react-icons/im";

function Loader() {
  return (
    <div role="status">
      <div className="animate-spin text-blue-500">
        <ImSpinner2 size={40} />
      </div>
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export default Loader;
