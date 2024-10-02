import React, { useContext } from "react";
import { StoreContext } from "../../globalContext/GlobalContext";
import { Link } from "react-router-dom";

function Category() {
  const { categoryCount } = useContext(StoreContext);

  return (
    <>
      <div className="main">
        <div className="border-b-2 pb-1">
          <h1 className="my-3 text-2xl md:text-3xl font-kaushan text-[#9b77cae8] font-semibold text-center md:text-left">
            Category
          </h1>
        </div>
        <div className="m-4">
          <ul className="">
            {categoryCount?.map((item, index) => (
              <li
                key={index}
                className="border-b-2 text-[.9rem] py-1.5 text-gray-600 hover:scale-105 transition-all duration-300"
              >
                <Link
                  to={`/category/${item.category}`}
                  className="flex justify-between"
                >
                  <span> {item.category}</span>
                  <span>({item.count})</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}

export default Category;
