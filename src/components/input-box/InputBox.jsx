import React from "react";


function InputBox({ value, name, type, id, placeholder, onChange }) {
  return (
    <div className="w-auto md:w-[350px] mb-4 rounded-md">
      <input
        type={type}
        name={name}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="py-2 pl-10 pr-4 border outline-none rounded-md w-full text-md"
        required
      />
    </div>
  );
}

export default InputBox;
