import { FcGoogle } from "react-icons/fc";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { actionType } from "../../contexts/reducer";
import { useStateValue } from "../../contexts/StateProvider";

function LoginWithGoogle() {
  const googleProvider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(auth, googleProvider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };

  return (
    <div
      onClick={() => login()}
      className="mt-4 mx-auto rounded-xl border border-gray-900 text-gray-900 w-full hover:bg-gray-200"
    >
      <button className="flex items-center justify-center w-full">
        <FcGoogle size={25} className="md:w-2/12" />
        <span className="md:w-10/12 p-3 transition-all duration-150">
          Login With Google
        </span>
      </button>
    </div>
  );
}

export default LoginWithGoogle;
