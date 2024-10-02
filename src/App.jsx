import React, { useContext } from "react";
import Navbar from "./components/navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import UserForm from "./components/user-form/UserForm";
import Home from "./pages/home/Home";
import Details from "./pages/details/Details";
import NotFound from "./pages/not-found/NotFound";
import Create from "./pages/create/Create";
import CategoryBlogs from "./pages/category-blogs/CategoryBlogs";
import ScrollTop from "./components/scroll-top/ScrollTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BlogSection from "./components/blog-section/BlogSection";
import { StoreContext } from "./globalContext/GlobalContext";
import SignupBlogs from "./components/signup-blogs/SignupBlogs";

function App() {
  const { blogs } = useContext(StoreContext);
  return (
    <>
      <div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route path="/" element={<SignupBlogs blogs={blogs} />} />
            <Route path="/signin" element={<UserForm type={"sign-in"} />} />
            <Route path="/signup" element={<UserForm type={"sign-up"} />} />
          </Route>
          <Route path="/home" element={<Home />} />
          <Route path="/create" element={<Create />} />
          <Route path="/details/:id" element={<Details />} />
          <Route path="/create/:id" element={<Create />} />
          <Route path="/category/:categoryName" element={<CategoryBlogs />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <ScrollTop />
      </div>
    </>
  );
}

export default App;
