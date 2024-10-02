import React, { useContext } from "react";
import { StoreContext } from "../../globalContext/GlobalContext";

function SigninComponent() {
  const { formData, handleOnChange, handleForm } = useContext(StoreContext);

  return (
    <form onSubmit={(e) => handleForm(e, "sign-in")} name="sign-in">
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleOnChange}
        placeholder="Email"
      />
      <input
        type="password"
        name="password"
        value={formData.password}
        onChange={handleOnChange}
        placeholder="Password"
      />
      <button type="submit">Sign In</button>
    </form>
  );
}

export default SigninComponent;
