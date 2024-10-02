import React, { useContext, useState } from "react";
import InputBox from "../input-box/InputBox";
import { FaRegUser } from "react-icons/fa6";
import { MdOutlineEmail } from "react-icons/md";
import { IoEyeOutline, IoKeyOutline } from "react-icons/io5";
import { IoEyeOffOutline } from "react-icons/io5";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";
import Animation from "../../common/animation/Animation";
import { StoreContext } from "../../globalContext/GlobalContext";

function UserForm({ type }) {
  const {
    passwordVisible,
    setPasswordVisible,
    formData,
    handleOnChange,
    handleForm,
  } = useContext(StoreContext);

  return (
    <>
      <Animation keyValue={type}>
        <section className=" h-[80vh] w-full mx-auto flex justify-center items-center flex-col">
          <form onSubmit={handleForm} className=" max-w-[400px]">
            <h1 className="font-semibold text-4xl font-gelasio text-gray-800 capitalize mb-14 text-center">
              {type === "sign-in" ? "Welcome Back" : "Join us today"}
            </h1>
            <div className="relative">
              {type !== "sign-in" ? (
                <InputBox
                  name={"fullname"}
                  type={"text"}
                  placeholder={"Full name"}
                  value={formData.fullname}
                  onChange={handleOnChange}
                />
              ) : (
                ""
              )}
              <FaRegUser size={20} className="absolute left-2 top-3" />
            </div>
            <div className="relative email ">
              <InputBox
                name={"email"}
                type={"email"}
                placeholder={"Enter email"}
                value={formData.email}
                onChange={handleOnChange}
              />
              <MdOutlineEmail size={25} className="absolute left-2 top-2" />
            </div>
            <div className="relative password">
              <InputBox
                name={"password"}
                type={passwordVisible ? "text" : "password"}
                placeholder={"Enter password"}
                value={formData.password}
                onChange={handleOnChange}
              />
              <IoKeyOutline size={20} className="absolute left-2 top-2" />
              {passwordVisible ? (
                <IoEyeOutline
                  onClick={() => setPasswordVisible(false)}
                  size={22}
                  className="absolute right-3 top-2.5 cursor-pointer"
                />
              ) : (
                <IoEyeOffOutline
                  onClick={() =>
                    setPasswordVisible((currentValue) => !currentValue)
                  }
                  size={22}
                  className="absolute right-3 top-2.5 cursor-pointer"
                />
              )}
            </div>
            <div className="button flex justify-center mt-2">
              {type !== "sign-in" ? (
                <button
                  type="submit"
                  className="py-2 px-8 bg-gray-800 text-white text-sm rounded-3xl outline-none"
                >
                  Sign up
                </button>
              ) : (
                <button
                  type="submit"
                  className="py-2 px-8 bg-gray-800 text-white text-sm rounded-3xl outline-none"
                >
                  Sign in
                </button>
              )}
            </div>
            <div className="relative w-full flex items-center gap-2 py-10 opacity-50 text-gray-900  border-gray-800">
              <hr className="w-1/2 border-gray-800" />
              <p>OR</p>
              <hr className="w-1/2 border-gray-800" />
            </div>

            <div className="w-full">
              <div className="relative">
                <button
                  type="button"
                  className="py-3 w-full bg-gray-800 text-white text-md rounded-3xl outline-none font-semibold"
                >
                  Continue With Google
                </button>
                <FcGoogle
                  size={28}
                  className="absolute top-2 left-5 md:left-14"
                />
              </div>
              {type === "sign-in" ? (
                <p className="text-md text-gray-600 text-center mt-3">
                  Do't have an account ?
                  <Link to={"/signup"} className="text-md ml-1 underline">
                    Join us today
                  </Link>
                </p>
              ) : (
                <p className="text-md text-gray-600 text-center mt-3">
                  Already a member?{" "}
                  <Link to={"/signin"} className="text-md ml-1 underline">
                    Sign in here
                  </Link>
                </p>
              )}
            </div>
          </form>
        </section>
      </Animation>
    </>
  );
}

export default UserForm;
