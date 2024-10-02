import React, { useContext } from "react";
import SigningNavbar from "../../components/signing-navbar/SigningNavbar";
import { StoreContext } from "../../globalContext/GlobalContext";
import { Link, useParams } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import { FiEdit } from "react-icons/fi";

function CategoryBlogs() {
  const { blogs, user, handleDeleteFunction, loading } =
    useContext(StoreContext);
  const { categoryName } = useParams();

  const flitterBlog = blogs?.filter((blog) => blog.category === categoryName);

  // Loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#845DB6"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }
  return (
    <>
      <div className="main-wrapper">
        <SigningNavbar />
        <div className="category-wrapper px:4 md:px-4">
          <div className="text-center border-b-2 pb-1 mt-5">
            <h1 className="text-3xl text-gray-600">
              Category:{" "}
              <span className="font-gelasio text-[#845DB6] font-semibold">
                {categoryName.toUpperCase()}
              </span>
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 px-20">
            {flitterBlog?.length > 0
              ? flitterBlog.map((item, index) => (
                  <div key={index} className="flex mt-10 gap-4 ">
                    <div>
                      <img
                        src={
                          item.imgUrl
                            ? item.imgUrl
                            : "path-to-placeholder-image.jpg"
                        }
                        alt={item.title}
                        className="w-[200px] object-cover border h-44 rounded-md"
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
                        <p className="text-gray-800 font-semibold">
                          {item.author}
                        </p>
                        --
                        <p className="text-sm text-gray-600"></p>
                      </span>
                      <div className="">
                        <p className="text-sm mt-1.5 text-gray-600 w-auto md:max-w-64">
                          {item.description.slice(0, 50)}...
                        </p>
                      </div>
                      <div className="flex items-center justify-between mt-4">
                        <Link to={`/details/${item.id}`}>
                          <button
                            type="button"
                            className="px-2 text-white text-sm rounded-sm py-1 bg-[#845DB6]"
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
                ))
              : "No blogs found in this category..."}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryBlogs;
