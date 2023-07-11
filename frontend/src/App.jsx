import "./App.css";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import { ToastContainer } from "react-toastify";
import Write from "./pages/Write/Write";
import { UserContext } from "./helpers/Context";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState(null);
  return (
    <>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/write" element={<Write />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
