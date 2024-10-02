import React from "react";
import { Link } from "react-router-dom";

function SignupBlogs({ blogs }) {
  return (
    <>
      <div className="main-wrapper px-6  md:px-20 mt-4 ">
        <div className="border-b-2 pb-6">
          <h2 className="text-4xl text-center font-kaushan font-semibold mt-10 text-[#845DB6]">
            Daily Blogs
          </h2>
        </div>
        {blogs?.map((item) => (
          <div className="main-blog-wrapper" key={item.id}>
            <div className=" flex flex-col md:flex-row gap-5 my-7">
              <div>
                <img
                  src={
                    item.imgUrl ? item.imgUrl : "path-to-placeholder-image.jpg"
                  }
                  alt={item.title || "Blog Image"}
                  className="w-auto md:w-[450px] object-cover border h-48 rounded-md"
                />
              </div>
              <div className="">
                <span className="px-2 py-1 rounded-md bg-blue-400 text-sm text-white">
                  {item.category}
                </span>
                <p className="mt-2 font-semibold text-md text-gray-700">
                  {item.title}
                </p>
                <span className="flex gap-2">
                  <p className="text-gray-800 font-semibold">{item.author}</p>--
                  <p className="text-sm text-gray-600">
                    {/* {item.timestamp.toDate().toDateString()} */}
                  </p>
                </span>
                <div className="">
                  <p className="text-sm mt-1.5 text-gray-600">
                    {item.description.slice(0, 200)}...
                  </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                  <Link to={`/signup`}>
                    <button
                      type="button"
                      className="px-2 text-white text-sm rounded-sm py-1 bg-[#845DB6]"
                    >
                      Read More
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default SignupBlogs;
