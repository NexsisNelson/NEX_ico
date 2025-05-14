import React from "react";

const Input = ({ placeholder, handleChange }) => {
  return <>
  <input 
    type="text" 
    placeholder={placeholder} 
    onChange={handleChange}
    className={"input-style"}
  />
  </>;
};

export default Input;
