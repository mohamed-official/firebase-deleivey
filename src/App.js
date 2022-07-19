import { Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewItem from "./pages/New";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Navbar />
        <main className="mt-24 p-8 w-full">
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
