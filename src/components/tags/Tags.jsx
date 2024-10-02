import React from "react";

function Tags({ tags }) {
  return (
    <>
      <div className="main-wrapper mt-12 ">
        <div className="border-b-2 pb-4">
          <h1 className="font-kaushan text-3xl font-semibold text-[#845DB6] text-center md:text-left">
            Tags
          </h1>
        </div>
        <div className="mt-5 flex justify-center md:justify-start  flex-wrap">
          {tags?.map((tag, index) => {
            return (
              <button
                className="pb-2.5 px-1 hover:scale-105 transition-all duration-300"
                key={index}
              >
                <p className="bg-slate-200 py-1 px-3 rounded-sm text-sm capitalize">
                  {tag}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Tags;
