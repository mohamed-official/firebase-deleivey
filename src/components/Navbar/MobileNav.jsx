import { Link } from "react-router-dom";
import Logo from "../../images/logo.png";
import Avatar from "../../images/avatar.png";
import { useStateValue } from "../../contexts/StateProvider";
import { Menu } from "@headlessui/react";
import { HiShoppingCart } from "react-icons/hi";
import MobileAccountDropDown from "./MobileAccountDropDown";

function MobileNav({ setLoginModalOpen, logout, showCart }) {
  const [{ user, cartItems }] = useStateValue();

  return (
    <>
      <Link to="/" className="flex items-center gap-2 cursor-pointer">
        <img src={Logo} alt="Logo" className="w-8 object-cover" />
        <p className="text-navbarColor text-xl font-bold">City</p>
      </Link>
      <div className="flex items-center gap-8">
        <div className="relative flex items-center justify-center">
          <HiShoppingCart
            onClick={() => showCart()}
            size={30}
            className="text-textColor cursor-pointer"
          />
          <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-red-600 flex items-center justify-center">
            <p className="text-xs text-white font-semibold">
              {cartItems && cartItems.length}
            </p>
          </div>
        </div>
        <div className="relative">
          <Menu.Button>
            <img
              onClick={() => !user && setLoginModalOpen(true)}
              src={user ? user.photoURL : Avatar}
              className="rounded-full w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-2xl cursor-pointer"
              alt="User Profile"
              referrerPolicy="no-referrer"
            />
          </Menu.Button>
          {user && <MobileAccountDropDown logout={logout} />}
        </div>
      </div>
    </>
  );
}

export default MobileNav;
