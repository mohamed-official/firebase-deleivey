import Delivery from "../../images/delivery.svg";
import HeroBG from "../../images/heroBg.png";
import { motion } from "framer-motion";
import { heroData } from "../../utils/data";

function HomeHeader() {
  return (
    <section
      className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full mt-3"
      id="home-header"
    >
      <div  className="py-2 flex-1 flex flex-col items-start gap-6">
        <div className="flex items-center gap-2 justify-center bg-orange-200 px-2 py-1 rounded-full">
          <p className="text-base text-orange-500 font-semibold">Fast Food</p>
          <div className="w-10 h-10 bg-white rounded-full overflow-hidden drop-shadow-xl">
            <img
              src={Delivery}
              className="w-full h-full object-contain"
              alt="Delivery"
            />
          </div>
        </div>
        <p className="text-[2.5rem] font-semibold tracking-wide text-gray-800">
          Fast{" "}
          <span className="text-orange-600 text-5xl font-bold">Delivery</span>,
          <br />
          High{" "}
          <span className="text-orange-600 text-5xl font-bold">Quality</span>.
        </p>
        <p className="text-base text-textColor md:w-[90%]">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Itaque,
          obcaecati ad sed fugiat labore sequi iure laudantium ipsa quis nam qui
          quidem natus rem vitae, ut illo aperiam officia eum!
        </p>
        <motion.button
          whileHover={{ scale: 0.96 }}
          transition={{ duration: 0.05 }}
          type="button"
          className="bg-gradient-to-br text-white text-lg from-orange-400 to-orange-500 w-full md:max-w-[26rem] px-4 py-2 rounded-lg hover:shadow-lg transition-all ease-in-out duration-200"
        >
          Order Now!
        </motion.button>
      </div>
      <div className="flex flex-1 items-center justify-center py-2 relative mt-10 md:mt-0">
        <img src={Delivery} alt="Delivery" />
      </div>
    </section>
  );
}

export default HomeHeader;
