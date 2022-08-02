import { BsGithub } from "react-icons/bs";
import { signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { auth } from "../../firebase";
import { actionType } from "../../contexts/reducer";
import { useStateValue } from "../../contexts/StateProvider";

function LoginWithGithub() {
  const githubProvider = new GithubAuthProvider();
  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(auth, githubProvider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };

  return (
    <div
      onClick={() => login()}
      className="mt-4 mx-auto rounded-xl bg-gray-700 hover:bg-gray-800 border text-white w-full"
    >
      <button className="flex items-center justify-center w-full">
        <BsGithub size={25} className="md:w-2/12" />
        <span className="md:w-10/12 p-3 transition-all duration-150">
          Login With Github
        </span>
      </button>
    </div>
  );
}

export default LoginWithGithub;
