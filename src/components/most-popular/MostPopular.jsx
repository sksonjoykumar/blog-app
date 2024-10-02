import React from "react";
import { useNavigate } from "react-router-dom";

function MostPopular({ blogs }) {
  const navigate = useNavigate();
  return (
    <>
      <div className="main-wrapper">
        <div className="mt-5">
          <h1 className="border-b-2 pb-3 text-[#845DB6] font-semibold text-2xl font-kaushan text-center md:text-left">
            Most Popular
          </h1>

          {blogs?.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 justify-center md:justify-start mt-5"
            >
              <img
                src={
                  item.imgUrl ? item.imgUrl : "path-to-placeholder-image.jpg"
                }
                alt={item.title || "Blog Image"}
                className="w-32 my-2  object-cover border h-24 rounded-md"
              />
              <div
                className="mt-2 cursor-pointer"
                onClick={() => navigate(`/details/${item.id}`)}
              >
                <p className="text-sm">{item.title}</p>
                <p className="text-sm">
                  {item.timestamp.toDate().toDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MostPopular;
