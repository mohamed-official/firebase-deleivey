import { useEffect } from "react";
import { Cart, HomeMenu, FruitSection, HomeHeader } from "../components";
import { useStateValue } from "../contexts/StateProvider";

function Home() {
  const [{ cartShow }, dispatch] = useStateValue();

  useEffect(() => {}, [cartShow]);

  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeHeader />
      <FruitSection />
      <HomeMenu />

      {cartShow && <Cart />}
    </div>
  );
}

export default Home;
