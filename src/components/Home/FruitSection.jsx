import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { MdChevronLeft, MdChevronRight } from "react-icons/md";
import Row from "./Row";
import { useStateValue } from "../../contexts/StateProvider";

function FruitSection() {
  const [{ products }, dispatch] = useStateValue();
  const [scrollValue, setScrollValue] = useState(0);

  return (
    <section className="w-full mt-16">
      <div className="w-full flex items-center justify-between">
        <p className="menu-section-title">Our Fresh Fruits</p>
        <div className="hidden md:flex gap-3 items-center">
          <motion.div
            whileTap={{ scale: 0.7, transition: { duration: 0.05 } }}
            className="w-10 h-10 text-white text-2xl rounded-lg bg-orange-500 hover:bg-orange-600 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg"
            onClick={() => setScrollValue((prev) => prev - 200)}
          >
            <MdChevronLeft />
          </motion.div>
          <motion.div
            whileTap={{ scale: 0.7, transition: { duration: 0.05 } }}
            className="w-10 h-10 text-white text-2xl rounded-lg bg-orange-500 hover:bg-orange-600 flex items-center justify-center cursor-pointer transition-all duration-100 ease-in-out hover:shadow-lg"
            onClick={() => setScrollValue((prev) => prev + 200)}
          >
            <MdChevronRight />
          </motion.div>
        </div>
      </div>
      <Row
        flag={true}
        data={products?.filter((item) => item.category === "fruits")}
        scrollValue={scrollValue}
      />
    </section>
  );
}

export default FruitSection;
