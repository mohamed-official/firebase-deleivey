import { HomeHeader } from "../components";

function Home() {
  return (
    <div className="w-full h-auto flex flex-col items-center justify-center">
      <HomeHeader />
      <div className="h-[1000px]"></div>
    </div>
  );
}

export default Home;
