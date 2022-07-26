import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { AiOutlinePlusCircle, AiOutlineHome } from "react-icons/ai";
import { MdMenuBook } from "react-icons/md";
import { FcAbout } from "react-icons/fc";
import { BiLogOut } from "react-icons/bi";
import { useStateValue } from "../../contexts/StateProvider";

function MobileAccountDropDown({ logout }) {
  const navigate = useNavigate();

  const [{ user }, dispatch] = useStateValue();

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items className="absolute right-0 top-12 w-56 origin-top-right rounded-md bg-white shadow-lg">
        {user.email === process.env.REACT_APP_ADMIN_EMAIL && (
          <Menu.Item>
            <button
              onClick={() => navigate("/new")}
              className="flex items-center border-b border-gray-300 text-gray-900 hover:bg-gray-100 w-full p-2 transition-all duration-150 ease-in-out"
            >
              <AiOutlinePlusCircle size={20} className="mr-3" />
              New Item
            </button>
          </Menu.Item>
        )}
        <Menu.Item>
          <button
            onClick={() => navigate("/")}
            className="flex items-center border-b border-gray-300 text-gray-900 hover:bg-gray-100 w-full p-2 transition-all duration-150 ease-in-out"
          >
            <AiOutlineHome size={20} className="mr-3" />
            Home
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            onClick={() => navigate("/menu")}
            className="flex items-center border-b border-gray-300 text-gray-900 hover:bg-gray-100 w-full p-2 transition-all duration-150 ease-in-out"
          >
            <MdMenuBook size={20} className="mr-3" />
            Menu
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            onClick={() => navigate("/about")}
            className="flex items-center border-b border-gray-300 text-gray-900 hover:bg-gray-100 w-full p-2 transition-all duration-150 ease-in-out"
          >
            <FcAbout size={20} className="mr-3" />
            About Us
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            onClick={() => logout()}
            className="flex items-center border-b border-gray-300 text-red-600 w-full hover:bg-gray-100 p-2 transition-all duration-150 ease-in-out"
          >
            <BiLogOut size={20} className="mr-3" />
            Logout
          </button>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
}

export default MobileAccountDropDown;
