import { useState } from "react";
import { IoFastFood } from "react-icons/io5";
import { categories } from "../../utils/data";
import { motion } from "framer-motion";
import Row from "./Row";
import { useStateValue } from "../../contexts/StateProvider";

function Menu() {
  const [filter, setFilter] = useState("chicken");

  const [{ products }, dispatch] = useStateValue();

  return (
    <section className="w-full mt-16">
      <div className="flex flex-col items-center justify-center w-full">
        <p className="menu-section-title">Top Meals</p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <motion.div
                whileTap={{ scale: 0.75 }}
                key={category.id}
                className={`group ${
                  filter === category.url ? "bg-orange-600" : "bg-card"
                } w-24 min-w-[94px] h-28 cursor-pointer rounded-lg drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-orange-600 `}
                onClick={() => setFilter(category.url)}
              >
                <div
                  className={`w-10 h-10 rounded-full shadow-lg ${
                    filter === category.url ? "bg-white" : "bg-orange-600"
                  } group-hover:bg-white flex items-center justify-center`}
                >
                  <IoFastFood
                    className={`${
                      filter === category.url
                        ? "text-orange-600"
                        : "text-white group-hover:text-textColor"
                    } text-lg`}
                  />
                </div>
                <p
                  className={`text-sm ${
                    filter === category.url ? "text-white" : "text-textColor"
                  } group-hover:text-white`}
                >
                  {category.name}
                </p>
              </motion.div>
            ))}
        </div>
        <div className="w-full">
          <Row
            flag={false}
            data={products?.filter((item) => item.category == filter)}
          />
        </div>
      </div>
    </section>
  );
}

export default Menu;
