import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";

function AccountDropDown() {
  const navigate = useNavigate();

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
      <Menu.Items className="absolute -right-4 top-14 w-56 origin-top-right rounded-md bg-white shadow-lg">
        <Menu.Item>
          <button
            onClick={() => navigate("/new")}
            className="flex border-b border-gray-300 text-gray-900 hover:bg-gray-100 w-full p-2 transition-all duration-150"
          >
            New Item
          </button>
        </Menu.Item>
        <Menu.Item>
          <button className="flex border-b border-gray-300 text-red-600 w-full hover:bg-gray-100 p-2 transition-all duration-150">
            Logout
          </button>
        </Menu.Item>
      </Menu.Items>
    </Transition>
  );
}

export default AccountDropDown;
