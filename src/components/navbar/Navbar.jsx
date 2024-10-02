import React, { useState } from "react";
import { ImBlog } from "react-icons/im";
import { CiSearch } from "react-icons/ci";
import { Link, Outlet } from "react-router-dom";
import UserForm from "../user-form/UserForm";

function Navbar() {
  const [showSearch, setShowSearch] = useState(true);
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  return (
    <>
      <nav className="py-3 border-b relative">
        <div className="mx-auto px-2 md:px-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <Link to={"/"} className="flex items-center gap-1">
                <ImBlog color="#0EADC6" size={22} />
                <h1 className="text-md font-bold text-[#845DB6] font-kaushan">
                  Writing
                </h1>
              </Link>

              <div className="md:flex items-center w-auto  md:w-64 py-1.5 px-2  bg-slate-100 border border-gray-300 rounded-3xl hidden">
                <CiSearch size={23} />
                <input
                  type="search"
                  name="search"
                  id=""
                  placeholder="Search"
                  className="bg-transparent border-none outline-none px-2 text-sm w-full "
                />
              </div>
              {!showSearch && (
                <div className="flex items-center justify-center py-2 px-2  bg-slate-100  border border-gray-300 rounded-3xl md:hidden absolute top-20 left-[12%] sm:left-[30%] opacity-100">
                  <CiSearch size={23} />
                  <input
                    type="search"
                    name="search"
                    id=""
                    placeholder="Search"
                    className="bg-transparent border-none outline-none px-2 text-sm w-full"
                  />
                </div>
              )}
            </div>
            <div className="flex items-center gap-1 md:gap-6">
              <CiSearch
                size={27}
                onClick={handleShowSearch}
                className="md:hidden cursor-pointer"
              />
              <div className="cursor-pointer hover:scale-105 transition-all duration-300 flex">
                <Link to={"/signup"} className="flex">
                  <span className="hidden md:flex">📝</span>
                  <span className="text-sm ml-1 font-normal text-gray-600 transition-all duration-200  hover:text-gray-800">
                    Write
                  </span>
                </Link>
              </div>
              <div className="">
                <Link
                  to={"/signin"}
                  className="py-2 px-3 bg-gray-900 text-white text-sm rounded-3xl outline-none"
                >
                  Sign In
                </Link>
                <Link
                  to={"/signup"}
                  className="py-2 px-3 ml-3 bg-gray-200 text-black text-sm rounded-3xl border hidden lg:inline-block"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
