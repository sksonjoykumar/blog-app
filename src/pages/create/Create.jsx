import React, { useContext } from "react";
import SigningNavbar from "../../components/signing-navbar/SigningNavbar";
import AddEditBlog from "../../components/add-edit-blog/AddEditBlog";
import { StoreContext } from "../../globalContext/GlobalContext";

function Create() {
  const { user, loading } = useContext(StoreContext);

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
    <div>
      <SigningNavbar />
      <AddEditBlog user={user} />
    </div>
  );
}

export default Create;
