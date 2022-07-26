import { Navbar } from "./components";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NewItem from "./pages/New";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence>
      <div className="max-w-screen h-auto flex flex-col bg-primary overflow-hidden">
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
