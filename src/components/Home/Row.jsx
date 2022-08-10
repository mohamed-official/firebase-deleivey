import { useEffect, useRef, useState } from "react";
import { HiShoppingCart } from "react-icons/hi";
import { motion } from "framer-motion";
import Loader from "../Loader";
import { useStateValue } from "../../contexts/StateProvider";
import { actionType } from "../../contexts/reducer";

function Row({ flag, data, scrollValue }) {
  const RowRef = useRef();

  const [items, setItems] = useState([]);
  const [{ cartItems }, dispatch] = useStateValue();

  const addToCart = () => {
    dispatch({
      type: actionType.SET_CART_ITEMS,
      cartItems: items,
    });
    localStorage.setItem("cartItems", JSON.stringify(items));
  };

  useEffect(() => {
    RowRef.current.scrollLeft += scrollValue;
  }, [scrollValue]);

  useEffect(() => {
    addToCart();
  }, [items]);

  return (
    <div
      ref={RowRef}
      className={`w-full flex items-center gap-3 mb-12 scroll-smooth ${
        flag
          ? "overflow-x-scroll scrollbar-none"
          : "overflow-x-hidden flex-wrap justify-center"
      }`}
    >
      {data ? (
        data.map((item) => (
          <div
            key={item.id}
            className="w-300 min-w-[300px] md:w-340 md:min-w-[340px] h-auto bg-cardOverlay rounded-lg p-2 my-12 backdrop-blur-lg hover:drop-shadow-lg"
          >
            <div className="w-full flex items-center justify-between">
              <motion.img
                whileHover={{ scale: 1.2, rotateZ: 5 }}
                src={item.imageURL}
                className="h-40 -mt-8 drop-shadow-2xl"
              />
              <motion.div
                whileTap={{ scale: 0.75 }}
                className="w-8 h-8 rounded-full bg-orange-600 flex items-center justify-center cursor-pointer hover:shadow-md"
                onClick={() => setItems([...cartItems, item])}
              >
                <HiShoppingCart className="text-white" />
              </motion.div>
            </div>
            <div className="w-full flex flex-col items-end justify-end">
              <p className="text-gray-700 font-semibold text-base md:text-lg">
                {item.title}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {item.calories} Calories
              </p>
              <div className="flex items-center gap-8">
                <p className="text-lg text-center text-gray-700 font-semibold">
                  <span className="text-sm text-green-500">$</span> {item.price}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="w-full flex justify-center align-items-center my-8">
          <Loader />
        </div>
      )}
    </div>
  );
}

export default Row;
