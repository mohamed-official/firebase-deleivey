import { Fragment } from "react";
import { Transition, Dialog } from "@headlessui/react";
import { FcGoogle } from "react-icons/fc";

function LoginModal({ isOpen, setIsOpen }) {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg text-center font-medium leading-6 text-gray-900"
                >
                  Login
                </Dialog.Title>
                <div className="mt-4 mx-auto border text-white border-blue-700 w-8/12">
                  <button className="flex items-center w-full">
                    <FcGoogle size={25} className="w-2/12" />
                    <span className="bg-blue-600 hover:bg-blue-500 w-10/12 p-3 transition-all duration-150">
                      Login With Google
                    </span>
                  </button>
                </div>

                <div className="mt-4 mx-auto border text-white border-blue-700 w-8/12">
                  <button className="flex items-center w-full">
                    <FcGoogle size={25} className="w-2/12" />
                    <span className="bg-blue-600 hover:bg-blue-500 w-10/12 p-3 transition-all duration-150">
                      Login With Github
                    </span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}

export default LoginModal;
