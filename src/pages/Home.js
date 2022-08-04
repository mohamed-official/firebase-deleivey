import { FruitSection, HomeHeader } from "../components";
import { HomeMenu } from "../components";

function Home() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeHeader />
      <FruitSection />
      <HomeMenu />
    </div>
  );
}

export default Home;
