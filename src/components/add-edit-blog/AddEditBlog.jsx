import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import React, { useContext, useEffect, useState } from "react";
import { db, storage } from "../../firebase";
import { TagsInput } from "react-tag-input-component";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { useNavigate, useParams } from "react-router-dom";
import { StoreContext } from "../../globalContext/GlobalContext";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  tags: [],
  trading: "no",
  category: "",
  description: "",
};

const categoryOption = [
  "Fashion",
  "Tech",
  "Computer",
  "Programming",
  "News",
  "Feed",
  "Politic",
  "Sports",
  "Business",
  "Model",
  "Food",
  "Travel",
];
function AddEditBlog({ user }) {
  const { loading } = useContext(StoreContext);
  const [form, setForm] = useState(initialState);
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const { id } = useParams();
  const navigate = useNavigate();

  const { title, tags, trading, category, description } = form;
  useEffect(() => {
    const uploadFile = () => {
      setIsUploading(true);
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes).toFixed(2) * 100;
          setProgress(progress);
        },
        (error) => {
          console.log(error);
          setIsUploading(false);
        },
        async () => {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          setForm((prev) => ({ ...prev, imgUrl: downloadUrl }));
          setIsUploading(false);
        }
      );
    };

    if (file) {
      uploadFile();
    }
  }, [file]);

  console.log(user);
  //   handleChange function
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  // console.log(form);

  //   handleTags function
  const handleTags = (tags) => {
    setForm({ ...form, tags });
  };

  //   handleTrading function
  const handleTrading = (e) => {
    setForm({ ...form, trading: e.target.value });
  };

  //   handleCategory function
  const handleCategory = (e) => {
    setForm({ ...form, category: e.target.value });
  };

  //   handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.imgUrl) {
      toast.warn("Please wait for the image to finish uploading.");
      return;
    }

    if (category && tags && title && description && trading) {
      if (!id) {
        try {
          await addDoc(collection(db, "blogs"), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.email.slice(0, 8),
            userId: user.uid,
            imgUrl: form.imgUrl,
          });

          toast.success("Document added successfully!");
          navigate("/home");
          setForm(initialState);
          setFile(null);
          setProgress(null);
        } catch (error) {
          toast.error("Failed to add the blog.");
          console.error(error);
        }
      } else {
        try {
          await updateDoc(doc(db, "blogs", id), {
            ...form,
            timestamp: serverTimestamp(),
            author: user.email.slice(0, 8),
            userId: user.uid,
            imgUrl: form.imgUrl,
          });

          toast.success("Document updated successfully!");
          navigate("/home");
          setForm(initialState);
          setFile(null);
          setProgress(null);
        } catch (error) {
          toast.error("Failed to update the blog.");
          console.error(error);
        }
      }
    } else {
      // alert("Please fill in all the required fields.");
      toast.warn("Please fill in all the required fields.");
    }
  };

  // console.log(form);

  useEffect(() => {
    id && editBlog();
  }, [id]);

  // editBlog function
  const editBlog = async () => {
    const docRef = doc(db, "blogs", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
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
      <main className="mx-auto mt-7 ">
        <div className="wrapper">
          <h3 className="text-center text-2xl  md:text-4xl font-kaushan font-semibold text-[#845DB6]">
            Create Blog
          </h3>
          <div className="content mt-5 mx-auto px-4 md:px-10  w-auto md:w-[65%]  p-5">
            <form onSubmit={handleSubmit}>
              <div className="">
                <input
                  onChange={handleChange}
                  value={title}
                  type="text"
                  name="title"
                  id=""
                  placeholder="Title"
                  className="w-full border border-gray-300  py-2.5 px-2 text-md rounded-md focus:outline-none mb-5"
                />
                <TagsInput
                  value={tags}
                  onChange={handleTags}
                  tags={tags}
                  placeHolder="Tags"
                  className="w-full border border-gray-300  py-2.5 px-2 text-md rounded-md focus:outline-none"
                />
              </div>
              <div className="flex justify-between mt-6 mx-1">
                <span className="text-md text-gray-600">
                  Is the treading blog?
                </span>
                <div className="space-x-4 text-gray-700">
                  <label htmlFor="yes">
                    <input
                      type="radio"
                      name="radioOption"
                      checked={trading === "yes"}
                      onChange={handleTrading}
                      id=""
                      value={"yes"}
                    />
                    Yes
                  </label>
                  <label htmlFor="no">
                    <input
                      type="radio"
                      id=""
                      name="radioOption"
                      checked={trading === "no"}
                      onChange={handleChange}
                      value={"no"}
                    />
                    No
                  </label>
                </div>
              </div>

              <div className="select mt-5">
                <select
                  name="category"
                  value={category}
                  onChange={handleCategory}
                  id=""
                  className="border w-full py-2.5 px-2 text-md rounded-md focus:outline-none cursor-pointer text-gray-600  border-gray-300"
                >
                  <option value="category">Please select category</option>
                  {categoryOption &&
                    categoryOption.map((option, index) => (
                      <option key={index} value={option || ""}>
                        {option}
                      </option>
                    ))}
                </select>
              </div>
              <div className="description mt-6">
                <textarea
                  value={description}
                  name="description"
                  onChange={handleChange}
                  placeholder="Description"
                  id=""
                  className="border border-gray-300 rounded-md resize-none w-full h-[14rem] focus:outline-none p-3 text-md"
                ></textarea>
              </div>
              <div className="file mt-2">
                <input
                  type="file"
                  name="file"
                  id=""
                  className="text-gray-600"
                  onChange={(e) => setFile(e.target.files[0])}
                />
              </div>

              <div className="mt-5 flex justify-center items-center">
                <button
                  type="submit"
                  className="bg-[#0EADC6] px-6 py-1.5 text-white rounded-md text-md hover:bg-[#0eadc6d3] transition-all duration-300"
                  disabled={isUploading}
                >
                  {isUploading ? "Uploading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default AddEditBlog;
