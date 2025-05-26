import React from "react";
import "./css/RedInputBtn.css";

interface ButtonProps {
  /** Button label or loading indicator */
  children: React.ReactNode;
  className?: string;
  /** Button type: submit or button */
  type?: "submit" | "button";
  /** Disable during loading or inactive state */
  disabled?: boolean;
}

const RedInputBtn: React.FC<ButtonProps> = ({
  children,
  type = "button",
  disabled = false,
}) => {
  return (
    <button
      id="redBtnSubmit"
      type={type}
      disabled={disabled}
      className="red-input-btn"
    >
      {children}
    </button>
  );
};

export default RedInputBtn;
