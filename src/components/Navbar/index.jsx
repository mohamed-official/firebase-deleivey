import { HiShoppingCart } from "react-icons/hi";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../../images/logo.png";
import Avatar from "../../images/avatar.png";
import { Menu } from "@headlessui/react";
import AccountDropDown from "./AccountDropDown";
import LoginModal from "../Auth/LoginModal";
import { useState } from "react";
import { useStateValue } from "../../contexts/StateProvider";
import MobileNav from "./MobileNav";
import { actionType } from "../../contexts/reducer";

function Navbar() {
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const [{ user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("user");
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
    navigate("/");
  };

  return (
    <Menu
      as="nav"
      className="fixed w-screen bg-primary z-10 p-3 px-4 md:p-6 md:px-16 shadow-md"
    >
      {/* Desktop Navbar */}
      <div className="hidden md:flex w-full h-full items-center justify-between">
        <motion.div whileHover={{ scale: 1.2 }}>
          <Link to="/" className="flex items-center gap-2 cursor-pointer">
            <img src={Logo} alt="Logo" className="w-8 object-cover" />
            <p className="text-navbarColor text-xl font-bold">Fast Food</p>
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
                onClick={() => !user && setLoginModalOpen(true)}
                whileTap={{ scale: 0.6 }}
                src={user ? user.photoURL : Avatar}
                className="rounded-full w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer"
                alt="User Profile"
                referrerPolicy="no-referrer"
              />
            </Menu.Button>
            {user && <AccountDropDown logout={logout} />}
          </div>
        </div>
      </div>
      {!user && (
        <LoginModal isOpen={loginModalOpen} setIsOpen={setLoginModalOpen} />
      )}
      {/* Mobile Navbar */}
      <div className="flex items-center justify-between md:hidden w-full h-full">
        <MobileNav setLoginModalOpen={setLoginModalOpen} logout={logout} />
      </div>
    </Menu>
  );
}

export default Navbar;
