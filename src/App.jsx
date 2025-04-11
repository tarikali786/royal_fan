import { Route, Routes } from "react-router-dom";
import "./App.css";
import { Footer, Header } from "./components";
import { Home } from "./pages/home";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route index element={<Home />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
