import { useContext, useEffect, useState } from "react";
import SigningNavbar from "../../components/signing-navbar/SigningNavbar";
import BlogSection from "../../components/blog-section/BlogSection";
import Tags from "../../components/tags/Tags";
import MostPopular from "../../components/most-popular/MostPopular";
import { StoreContext } from "../../globalContext/GlobalContext";
import Trading from "../../components/trading-blog/Trading";
import Category from "../../components/category/Category";
import { TailSpin } from "react-loader-spinner";

function Home() {
  const { blogs, tags, loadMore, loading } = useContext(StoreContext);

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
      <SigningNavbar />
      <div className=" px-6 md:px-20">
        <div className="trading">
          <Trading />
        </div>

        <div className="main-wrapper flex flex-col md:flex-row">
          <div className="flex flex-col">
            <div className="blog">{<BlogSection blogs={blogs} />}</div>
            <div className="flex justify-center items-center mb-4">
              <button
                onClick={loadMore}
                type="button"
                className="bg-[#0EADC6] px-3 py-1.5 text-sm rounded-md text-white hover:bg-[#0eadc6cc] transition-all duration-300"
              >
                Load More
              </button>
            </div>
          </div>
          <div className="flex flex-col w-auto md:w-[480px]">
            <div className="tags">
              <Tags tags={tags} />
            </div>
            <div className="popular">
              <MostPopular blogs={blogs} />
            </div>
            <div className="">
              <Category />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Home;
