import { doc, getDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../firebase";
import SigningNavbar from "../../components/signing-navbar/SigningNavbar";
import Tags from "../../components/tags/Tags";
import MostPopular from "../../components/most-popular/MostPopular";
import { StoreContext } from "../../globalContext/GlobalContext";
import RelatedBlogs from "../../components/related-blogs/RelatedBlogs";
import CommentForm from "../../components/comment-form/CommentForm";
import CommentList from "../../components/comment-list/CommentList";
import Like from "../../components/like-component/Like";

function Details() {
  const { blogs, tags, loading } = useContext(StoreContext);
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    id && getBlogDetails();
  }, [id]);

  const getBlogDetails = async () => {
    const docRef = doc(db, "blogs", id);
    const blogDetails = await getDoc(docRef);
    setBlog(blogDetails.data());
  };

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
      <div className="main-wrapper px-6 lg:px-20">
        <div className="mt-5">
          <div className=" mx-auto relative flex justify-center">
            <img
              src={blog?.imgUrl}
              alt="blog-img"
              className="border w-[80%] h-auto lg:h-[550px] object-cover rounded-md"
            />
            <p className="absolute bottom-5 left-[40%] lg:left-1/1 text-3xl md:text-6xl font-gelasio font-semibold text-[tomato]">
              {blog?.title}
            </p>
          </div>
        </div>
        <div className="flex gap-10 flex-col md:flex-row">
          <div className="left-side w-auto md:w-[80%] md:px-10">
            <div className="flex justify-between border-b-2">
              <div className="flex gap-2 my-5 ">
                <p className="text-md font-semibold text-gray-700">
                  By {blog?.author}
                </p>
                -
                <p className="text-sm text-gray-600">
                  {blog?.timestamp.toDate().toDateString()}
                </p>
              </div>
              <div>
                {/* Like component here */}
                <Like blogId={id} />
              </div>
            </div>
            <p className="text-md text-gray-600 leading-relaxed text-center md:text-left mt-4 px-5 md:px-0">
              {blog?.description}
            </p>

            <div className="mt-5 text-center md:text-left">
              <h1 className="font-gelasio text-2xl pb-3 font-semibold text-[#0EADC6] ">
                Tags
              </h1>
              {blog?.tags.map((tag, index) => (
                <button
                  key={index}
                  className="pb-2.5 px-1 hover:scale-105 transition-all duration-300 "
                >
                  <p className="bg-slate-200 py-1 px-3 rounded-sm text-sm capitalize">
                    {tag}
                  </p>
                </button>
              ))}
            </div>
            <CommentForm blogId={id} />
            <CommentList blogId={id} />
          </div>
          <div className="right-side my-5 w-auto md:w-[400px]">
            <Tags tags={tags} />
            <MostPopular blogs={blogs} />
          </div>
        </div>
        <RelatedBlogs />
      </div>
    </>
  );
}

export default Details;
