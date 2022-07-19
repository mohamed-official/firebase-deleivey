import { HiShoppingCart } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import Avatar from "../../images/avatar.png";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app, auth } from "../../firebase";
import { useStateValue } from "../../contexts/StateProvider";
import { actionType } from "../../contexts/reducer";
import { Menu } from "@headlessui/react";
import AccountDropDown from "./AccountDropDown";
import LoginModal from "../Auth/LoginModal";
import { useState } from "react";

function Navbar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const provider = new GoogleAuthProvider();

  const [{ user }, dispatch] = useStateValue();

  const login = async () => {
    const {
      user: { refreshToken, providerData },
    } = await signInWithPopup(auth, provider);
    dispatch({
      type: actionType.SET_USER,
      user: providerData[0],
    });
    localStorage.setItem("user", JSON.stringify(providerData[0]));
  };

  return (
    <Menu as="nav" className="fixed w-screen p-6 px-16 md:shadow-md">
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <motion.div whileHover={{ scale: 1.2 }}>
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src={Logo} alt="Logo" className="w-8 object-cover" />
            <p className="text-navbarColor text-xl font-bold">City</p>
          </Link>
        </motion.div>
        <ul className="flex items-center gap-8">
          <li className="desktop-nav-item">Home</li>
          <li className="desktop-nav-item">Menu</li>
          <li className="desktop-nav-item">About Us</li>
          <li className="desktop-nav-item">Service</li>
        </ul>
        <div className="flex items-center gap-8">
          <div className="relative flex items-center justify-center">
            <HiShoppingCart
              size={30}
              className="text-textColor cursor-pointer"
            />
            <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
              <p className="text-xs text-white font-semibold">2</p>
            </div>
          </div>
          <div className="relative">
            <Menu.Button>
              <motion.img
                onClick={() =>
                  user ? console.log("already logged") : setLoginModalOpen(true)
                }
                whileTap={{ scale: 0.6 }}
                src={user ? user.photoURL : Avatar}
                className="rounded-full w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer"
                alt="User Profile"
              />
            </Menu.Button>
            {user && <AccountDropDown />}
            <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
          </div>
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex md:hidden w-full h-full"></div>
    </Menu>
  );
}

export default Navbar;
