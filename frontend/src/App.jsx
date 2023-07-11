import "./App.css";
import Home from "./pages/Home/Home";
import HomeNav from "./components/HomeNav/HomeNav";
import Login from "./pages/Login/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Explore from "./pages/Explore/Explore";
import { ToastContainer } from "react-toastify";
import Write from "./pages/Write/Write";
import { UserContext } from "./helpers/Context";
import { useState, useEffect } from "react";

function App() {
  const [miniMediumUserData, setMiniMediumUserData] = useState(() => {
    const storedUserData = localStorage.getItem("miniMediumUserData");
    return storedUserData ? JSON.parse(storedUserData) : null;
  });

  useEffect(() => {
    if (miniMediumUserData) {
      localStorage.setItem(
        "miniMediumUserData",
        JSON.stringify(miniMediumUserData)
      );
    } else {
      localStorage.removeItem("miniMediumUserData");
    }
  }, [miniMediumUserData]);
  return (
    <>
      <UserContext.Provider
        value={{ miniMediumUserData, setMiniMediumUserData }}
      >
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/write" element={<Write />} />
            <Route path="/header" element={<HomeNav />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
