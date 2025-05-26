import React from "react";
import "./css/SecInputBtn.css";
interface InputProps {
  value: string;
  onClick?: () => void;
}
const SecInputBtn: React.FC<InputProps> = ({ value, onClick }) => {
  return (
    <>
      <button id="secBtnSubmit" onClick={onClick}>
        {value}
      </button>
    </>
  );
};

export default SecInputBtn;
