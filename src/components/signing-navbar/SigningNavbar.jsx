import React, { useContext, useState } from "react";
import { ImBlog } from "react-icons/im";
import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";
import { CiBellOn } from "react-icons/ci";
import { AiOutlineUser } from "react-icons/ai";
import { LuLayoutDashboard } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { PiSignOutLight } from "react-icons/pi";
import { StoreContext } from "../../globalContext/GlobalContext";

function SigningNavbar() {
  const { user, handleLogOutUser } = useContext(StoreContext);

  const [showSearch, setShowSearch] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  //   handleShowSearch function
  const handleShowSearch = () => {
    setShowSearch(!showSearch);
  };

  //   handleMenu function
  const handleMenu = () => {
    setShowMenu(!showMenu);
  };

  //   handleLogOutUser function
  const handleLogIntUser = () => {
    if (user && user.uid && user.email) {
    }
  };
  handleLogIntUser();

  return (
    <>
      <nav className="py-3 border-b sticky top-0 z-50 bg-slate-50">
        <div className="mx-auto px-2 md:px-10">
          <div className="flex justify-between items-center">
            <div className="flex gap-6">
              <Link to={"/home"} className="flex items-center gap-1">
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
              {showSearch && (
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
                <Link to={"/create"} className="flex">
                  <span className="hidden md:flex">📝</span>
                  <span className="text-sm ml-1 font-normal text-gray-600 transition-all duration-200  hover:text-gray-800">
                    Write
                  </span>
                </Link>
              </div>

              <span className="cursor-pointer">
                <CiBellOn size={27} color="grey" />
              </span>
              <div className="flex items-center gap-3">
                <span className="text-gray-600 uppercase text-xl ">
                  {user && user.email.slice(0, 2)}
                </span>
                <img
                  title={user && user.email.slice(0, 8)}
                  onClick={handleMenu}
                  src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
                  alt="user"
                  className="w-10 h-10 rounded-full object-cover border cursor-pointer hover:scale-105 transition-all duration-300"
                />
              </div>

              {showMenu && (
                <div className="absolute top-20 bg-white right-10 border w-auto md:w-40 px-3 py-4 rounded-md shadow-sm">
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-1 items-center  hover:bg-gray-100 py-1.5 px-1  rounded-sm transition-all duration-200">
                      <AiOutlineUser color="grey" size={18} />
                      <Link
                        to={"/users/profile"}
                        className="text-sm text-gray-500"
                      >
                        Profile
                      </Link>
                    </div>
                    <div className="flex gap-1 items-center  hover:bg-gray-100 py-1.5 px-1  rounded-sm transition-all duration-200">
                      <LuLayoutDashboard color="grey" size={16} />
                      <Link
                        to={"/users/dashboard"}
                        className="text-sm text-gray-500"
                      >
                        Dashboard
                      </Link>
                    </div>
                    <div className="flex gap-1 items-center  hover:bg-gray-100 py-1.5 px-1  rounded-sm transition-all duration-200">
                      <IoSettingsOutline color="grey" size={16} />
                      <Link
                        to={"/users/setting"}
                        className="text-sm text-gray-500"
                      >
                        Setting
                      </Link>
                    </div>
                    <div className=" hover:bg-gray-100 py-1.5 px-1  rounded-sm transition-all duration-200">
                      <div className="flex gap-1 items-center">
                        <PiSignOutLight color="grey" size={20} />
                        <Link
                          onClick={handleLogOutUser}
                          to={"/signin"}
                          className="text-sm text-gray-500 font-semibold "
                        >
                          Sign Out
                        </Link>
                      </div>
                      <span className="text-[.8rem] text-gray-500 ml-5 ">
                        @{user.email.slice(0, 8)}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default SigningNavbar;
