import React, { useContext, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import { StoreContext } from "../../globalContext/GlobalContext";

function BlogSection({ blogs }) {
  const { user, handleDeleteFunction } = useContext(StoreContext);

  return (
    <>
      <div className="main-wrapper px-5 md:px-10 mt-4 ">
        <div className="border-b-2 pb-6">
          <h2 className=" text-center md:text-left text-3xl font-kaushan font-semibold mt-10 text-[#845DB6]">
            Daily Blogs
          </h2>
        </div>
        {blogs?.map((item) => (
          <div className="main-blog-wrapper" key={item.id}>
            <div className=" flex gap-5 flex-col lg:flex-row my-7 text-center md:text-left">
              <div>
                <img
                  src={
                    item.imgUrl ? item.imgUrl : "path-to-placeholder-image.jpg"
                  }
                  alt={item.title || "Blog Image"}
                  className=" w-full lg:w-[450px] object-cover border h-auto md:[h-32] lg:h-48 rounded-md"
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
                  <p className="text-gray-800 font-semibold ">{item.author}</p>
                  --
                  <p className="text-sm text-gray-600">
                    {item.timestamp.toDate().toDateString()}
                  </p>
                </span>
                <div className="">
                  <p className="text-sm mt-1.5 text-gray-600">
                    {item.description.slice(0, 200)}...
                  </p>
                </div>
                <div className="flex items-center justify-center md:justify-between mt-4">
                  <Link to={`/details/${item.id}`}>
                    <button
                      type="button"
                      className="px-2 text-white text-sm rounded-sm py-1 bg-[#845DB6]  "
                    >
                      Read More
                    </button>
                  </Link>
                  {user?.uid && item.userId === user.uid && (
                    <div className="flex gap-2">
                      <MdDeleteOutline
                        onClick={() => handleDeleteFunction(item.id)}
                        size={30}
                        color="tomato"
                        className="cursor-pointer"
                      />
                      <Link to={`/create/${item.id}`}>
                        <FiEdit
                          size={30}
                          color="#845DB6"
                          className="cursor-pointer"
                        />
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default BlogSection;
