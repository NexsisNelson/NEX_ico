import React from "react";

const Button = ({ name, handleClick, classStyle }) => {
  return( <button className={`${classStyle} new-button`} onClick={handleClick}>
    {name}
  </button>
  );
};

export default Button;
