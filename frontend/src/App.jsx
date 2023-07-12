import "./App.css";
import Home from "./pages/Home/Home";
import HomeNav from "./components/HomeNav/HomeNav";
import Login from "./pages/Login/Login";
import Explore from "./pages/Explore/Explore";
import Write from "./pages/Write/Write";
import BlogRead from "./pages/BlogRead/BlogRead";
import Saves from "./pages/Saves/Saves";
import Account from "./pages/Account/Account";
import EditBlog from "./pages/EditBlog/EditBlog";
import { ToastContainer } from "react-toastify";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserContext } from "./helpers/Context";

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
            <Route path="/read/:blogId" element={<BlogRead />} />
            <Route path="/edit/:blogId" element={<EditBlog />} />
            <Route path="/saves" element={<Saves />} />
            <Route path="/my-account" element={<Account />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
