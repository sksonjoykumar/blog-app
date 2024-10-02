import React, { useContext, useState } from "react";
import { StoreContext } from "../../globalContext/GlobalContext";
import { Link } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function RelatedBlogs() {
  const { blogs, user, handleDeleteFunction } = useContext(StoreContext);
  //   const [visibleUserData, setVisibleUserData] = useState(5);

  // visibleBlogs Display Blogs
  const visibleBlogs = blogs.slice(0, 3);

  return (
    <>
      <div className="category-wrapper px-2  md:px-10 mb-4 ">
        <div className="mt-10">
          <h1 className="border-b-2 pb-3 text-[#845DB6] font-semibold text-4xl font-kaushan text-center md:text-left">
            Related Blogs
          </h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {visibleBlogs?.length > 0
            ? visibleBlogs.map((item, index) => (
                <Link key={index} to={`/details/${item.id}`}>
                  <div className="md:flex mt-5 gap-4 flex-col lg:flex-row  border-2 p-4 shadow-sm cursor-pointer  rounded-md ">
                    <div>
                      <img
                        src={
                          item.imgUrl
                            ? item.imgUrl
                            : "path-to-placeholder-image.jpg"
                        }
                        alt={item.title}
                        className="w-full mb-3 md:w-[200px] object-cover border h-44 rounded-md"
                      />
                    </div>
                    <div className="">
                      <span className="px-2 py-1 rounded-md bg-blue-400 text-sm text-white">
                        {item.category}
                      </span>
                      <p className="mt-2 font-semibold text-md text-gray-700">
                        {item.author}
                      </p>
                      <p className="mt-2 font-semibold text-md text-gray-700">
                        {item.title}
                      </p>
                      <span className="flex gap-2">
                        <p className="text-sm text-gray-600"></p>
                      </span>
                      <div className="">
                        <p className="text-sm mt-1.5 text-gray-600 w-auto md:max-w-64">
                          {item.description.slice(0, 50)}...
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
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
                </Link>
              ))
            : "No blogs found in this category..."}
        </div>
      </div>
    </>
  );
}

export default RelatedBlogs;
