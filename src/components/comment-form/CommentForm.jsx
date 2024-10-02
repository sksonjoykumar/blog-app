import React, { useState } from "react";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../../firebase";

function CommentForm({ blogId }) {
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content) return;

    try {
      const commentsRef = collection(db, "blogs", blogId, "comments");
      await addDoc(commentsRef, {
        content,
        timestamp: Timestamp.fromDate(new Date()),
      });

      setContent("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-5">
      <div className="flex flex-col mb-2">
        <label className="mb-1 font-semibold text-center md:text-left">
          Comment:
        </label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="border p-2 rounded focus:outline-none resize-none"
          rows="4"
          required
          placeholder="Write your comments..."
        />
      </div>
      <div className="flex justify-center md:justify-start">
        <button
          type="submit"
          className="bg-[#0EADC6] text-white py-2 px-4 rounded-md hover:bg-[#0C99B0]"
        >
          Comment
        </button>
      </div>
    </form>
  );
}

export default CommentForm;
