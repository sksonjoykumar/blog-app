import React from "react";
import notFoundImg from "../../assets/images/notfound.jpg";
import SigningNavbar from "../../components/signing-navbar/SigningNavbar";

function NotFound() {
  return (
    <div>
      <SigningNavbar />
      <div className="flex justify-center items-center mt-20">
        <img
          src={notFoundImg}
          alt="not-found"
          className="w-auto h-auto md:w-[60%] md:h-[500px] rounded-md"
        />
      </div>
    </div>
  );
}

export default NotFound;
