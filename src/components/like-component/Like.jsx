import { doc, getDoc, increment, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../firebase";
import { FaHeart } from "react-icons/fa6";

function Like({ blogId }) {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  //   useEffect
  useEffect(() => {
    const fetchLikes = async () => {
      const docRef = doc(db, "blogs", blogId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setLikes(docSnap.data().likes || 0);
      }
    };
    fetchLikes();
  }, [blogId]);

  //   handleLike function
  const handleLike = async () => {
    if (!liked) {
      const docRef = doc(db, "blogs", blogId);

      await updateDoc(docRef, {
        likes: increment(1),
      });

      setLikes((prevLikes) => prevLikes + 1);
      setLiked(true);
    }
  };
  return (
    <>
      <div className="like-component flex gap-4 mt-5">
        <p>
          {likes} {likes === 1 ? "Like" : "Likes"}
        </p>
        <button
          onClick={handleLike}
          disabled={liked}
          className={`cursor-pointer`}
          type="button"
        >
          {liked ? (
            <FaHeart size={26} title="liked" color="red" />
          ) : (
            <FaHeart size={26} title="Like" />
          )}
        </button>
      </div>
    </>
  );
}

export default Like;
