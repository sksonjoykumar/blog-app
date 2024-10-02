import React, { useContext, useEffect, useRef } from "react";
import { StoreContext } from "../../globalContext/GlobalContext";
import { Link } from "react-router-dom";

function Trading() {
  const { blogs, loading } = useContext(StoreContext);
  const scrollContainerRef = useRef(null);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    const handleWheelScroll = (event) => {
      if (event.deltaY !== 0) {
        event.preventDefault();
        scrollContainer.scrollLeft += event.deltaY;
      }
    };

    scrollContainer.addEventListener("wheel", handleWheelScroll);

    return () =>
      scrollContainer.removeEventListener("wheel", handleWheelScroll);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-60">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#4fa94d"
          ariaLabel="tail-spin-loading"
          radius="1"
        />
      </div>
    );
  }

  return (
    <>
      <div className="px-0 md:px-10 ">
        <h1 className="text-center mt-10 text-2xl md:text-4xl font-kaushan mb-6  text-[#9b77cae8] font-semibold">
          Trading
        </h1>
        <div
          style={{ WebkitOverflowScrolling: "touch", scrollbarWidth: "none" }}
          ref={scrollContainerRef}
          className="flex mt-4 overflow-x-scroll"
        >
          {blogs?.map((item) => (
            <Link key={item.id} to={`/details/${item.id}`}>
              {item.trading === "yes" ? (
                <div className="relative mx-3">
                  <img
                    src={
                      item.imgUrl
                        ? item.imgUrl
                        : "path-to-placeholder-image.jpg"
                    }
                    alt={item.title}
                    className="max-w-80 h-60 object-cover rounded-md cursor-pointer hover:scale-105 transition-all duration-300 border-2"
                  />
                  <div className="absolute bottom-3 right-1/4 px-4 mb-2">
                    <p className="text-white text-sm text-center">
                      {item.title}
                    </p>
                    <p className="text-white text-sm text-center">
                      {item.timestamp.toDate().toDateString()}
                    </p>
                  </div>
                </div>
              ) : null}
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default Trading;
