import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { db, auth } from "../firebase";
import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TailSpin } from "react-loader-spinner";

// React UseContext Hook
export const StoreContext = createContext(null);

function GlobalContext({ children }) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState([]);
  const [tags, setTags] = useState([]);
  const [totalBlogs, setTotalBlogs] = useState([]);
  const [visibleUserData, setVisibleUserData] = useState(7);
  const [user, setUser] = useState(null);

  //   navigate
  const navigate = useNavigate();

  // loadMore function
  const loadMore = () => {
    setVisibleUserData((prevUser) => prevUser + 5);
  };

  // visibleBlogs Display Blogs
  const visibleBlogs = blogs.slice(0, visibleUserData);

  useEffect(() => {
    const unSub = onSnapshot(collection(db, "blogs"), (snapshot) => {
      let list = [];
      let tags = [];
      snapshot.docs.forEach((doc) => {
        tags.push(...doc.get("tags"));
        list.push({ id: doc.id, ...doc.data() });
      });
      const uniqueTags = [...new Set(tags)];
      setTotalBlogs(list);
      setTags(uniqueTags);
      setBlogs(list);
    });

    return () => {
      unSub();
    };
  }, []);

  //   user data

  //   handleLogOutUser function
  const handleLogOutUser = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate("/signin");
    });
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // toast.success("User is signed in!");
        setUser(user);
      } else {
        // toast.success("No user is signed in!");
        setUser(null);
      }
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  // useEffect
  useEffect(() => {
    if (blogs.length > 0 && tags.length > 0 && user !== undefined) {
      setLoading(false);
    }
  }, [blogs, tags, user]);

  //   handleOnChange function
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  //   // handleForm function
  const handleForm = async (event, type) => {
    event.preventDefault();

    const { fullname, email, password } = formData;

    try {
      if (type === "sign-in") {
        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;
          toast.success("Signed in successfully!");
          navigate("/home");
        } catch (signInError) {
          if (signInError.code === "auth/user-not-found") {
            toast.error("No user found with this email. Please sign up.");
          } else if (signInError.code === "auth/wrong-password") {
            toast.error("Incorrect password. Please try again.");
          } else {
            toast.error(signInError.message);
          }
        }
      } else {
        try {
          const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
          );
          const user = userCredential.user;

          await setDoc(doc(db, "users", user.uid), {
            fullname: fullname,
            email: email,
            createdAt: new Date(),
          });

          toast.success("User created successfully!");
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } catch (signupError) {
          if (signupError.code === "auth/email-already-in-use") {
            toast.error(
              "This email is already in use. Please sign in instead."
            );
            navigate("/signin");
          } else {
            toast.error(signupError.message);
          }
        }
      }
    } catch (error) {
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  // Category Count
  const counts = (totalBlogs || []).reduce((preValue, currentValue) => {
    let name = currentValue.category || "Uncategorized";

    if (!preValue.hasOwnProperty(name)) {
      preValue[name] = 0;
    }

    preValue[name]++;

    return preValue;
  }, {});

  const categoryCount = Object.keys(counts).map((key) => {
    return {
      category: key,
      count: counts[key],
    };
  });

  // handleDeleteFunction
  const handleDeleteFunction = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete the blog?"
    );
    if (confirmDelete) {
      try {
        setLoading(true);
        const docRef = doc(db, "blogs", id);
        await deleteDoc(docRef);
        setLoading(false);
        toast.error("Blog deleted successfully");
      } catch (error) {
        console.log(error);
      }
    }
  };

  //   contextValue
  const contextValue = {
    passwordVisible,
    setPasswordVisible,
    formData,
    setFormData,
    navigate,
    handleOnChange,
    handleForm,
    user,
    setUser,
    handleLogOutUser,
    blogs: visibleBlogs,
    setBlogs,
    tags,
    setTags,
    loadMore,
    categoryCount,
    handleDeleteFunction,
    loading,
  };

  // Conditional rendering based on loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#845DB6"
          ariaLabel="tail-spin-loading"
        />
      </div>
    );
  }

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
}

export default GlobalContext;
