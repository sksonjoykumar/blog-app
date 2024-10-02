import React, { useContext, useEffect, useState } from "react";
import { collection, query, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../../firebase";
import { StoreContext } from "../../globalContext/GlobalContext";

function CommentList({ blogId }) {
  const [comments, setComments] = useState([]);
  const { blogs } = useContext(StoreContext);


  useEffect(() => {
    const commentsRef = collection(db, "blogs", blogId, "comments");
    const q = query(commentsRef, orderBy("timestamp", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedComments = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(fetchedComments);
    });

    return () => unsubscribe();
  }, [blogId]);


  return (
    <div className="mt-5">
      <h2 className="text-xl font-semibold mb-4">Comments</h2>

      {comments.length > 0 ? (
        comments.map((comment) => (
          <div key={comment.id} className="mb-4 border p-4 rounded-lg">
            {blogs && blogs.length > 0 && (
              <div>{blogs[0].author.slice(0, 8)}</div>
            )}

            <p className="text-gray-600">{comment.content}</p>
            <p className="text-sm text-gray-500">
              {comment.timestamp.toDate().toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p>No comments yet.</p>
      )}
    </div>
  );
}

export default CommentList;
