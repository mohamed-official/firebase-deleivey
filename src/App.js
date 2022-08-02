import { Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewItem from "./pages/New";
import { AnimatePresence } from "framer-motion";
import { useStateValue } from "./contexts/StateProvider";
import { firebaseFetchProducts } from "./utils/firebaseFunctions";
import { useEffect } from "react";
import { actionType } from "./contexts/reducer";

function App() {
  const [{ products }, dispatch] = useStateValue();

  const fetchProducts = async () => {
    await firebaseFetchProducts().then((data) => {
      dispatch({
        type: actionType.SET_PRODUCTS,
        products: data,
      });
    });
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AnimatePresence>
      <div className="max-w-screen h-auto flex flex-col overflow-hidden">
        <Navbar />
        <main className="mt-16 md:mt-24 px-4 md:px-14 py-4 w-full">
          <Routes>
            <Route path="/*" element={<Home />} />
            <Route path="/new" element={<NewItem />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
