import "./css/PasswordInput.css";
import { useState } from "react";
import React from "react";

interface InputProps {
  width?: string;
  label_head: string;
  // type?: string;
  error_message?: string;
  border?: string;
  name: string;
  id?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}
const PasswordInput: React.FC<InputProps> = ({
  width = "100%",
  label_head,
  // type = "text",
  error_message = "",
  border = "gray",
  name,
  id,
  value,
  onChange,
  placeholder = "",
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword((prev) => !prev);
  return (
    <div className="input-container" style={{ width }}>
      <label htmlFor={id || name}>{label_head}</label>
      <div className="password-input-wrapper">
        <input
          style={{ border: `1px solid ${border}` }}
          type={showPassword ? "text" : "password"}
          id={id || name}
          name={name}
          className="input-box"
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <span className="eye-toggle" onClick={togglePassword}>
          {showPassword ? (
            // Eye open SVG
            <svg
              width="16"
              height="12"
              viewBox="0 0 22 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14 8.79565 13.6839 9.55871 13.1213 10.1213C12.5587 10.6839 11.7956 11 11 11C10.2044 11 9.44129 10.6839 8.87868 10.1213C8.31607 9.55871 8 8.79565 8 8C8 7.20435 8.31607 6.44129 8.87868 5.87868C9.44129 5.31607 10.2044 5 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C20.27 12.39 16 15.5 11 15.5C6 15.5 1.73 12.39 0 8C1.73 3.61 6 0.5 11 0.5ZM2.18 8C2.98825 9.65031 4.24331 11.0407 5.80248 12.0133C7.36165 12.9858 9.1624 13.5013 11 13.5013C12.8376 13.5013 14.6383 12.9858 16.1975 12.0133C17.7567 11.0407 19.0117 9.65031 19.82 8C19.0117 6.34969 17.7567 4.95925 16.1975 3.98675C14.6383 3.01424 12.8376 2.49868 11 2.49868C9.1624 2.49868 7.36165 3.01424 5.80248 3.98675C4.24331 4.95925 2.98825 6.34969 2.18 8Z"
                fill="gray"
              />
            </svg>
          ) : (
            // Eye closed SVG
            <svg
              width="16"
              height="12"
              viewBox="0 0 22 18"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1 1.27L2.28 0L19 16.72L17.73 18L14.65 14.92C13.5 15.3 12.28 15.5 11 15.5C6 15.5 1.73 12.39 0 8C0.69 6.24 1.79 4.69 3.19 3.46L1 1.27ZM11 5C11.7956 5 12.5587 5.31607 13.1213 5.87868C13.6839 6.44129 14 7.20435 14 8C14.0005 8.34057 13.943 8.67873 13.83 9L10 5.17C10.3213 5.05698 10.6594 4.99949 11 5ZM11 0.5C16 0.5 20.27 3.61 22 8C21.1834 10.0729 19.7966 11.8723 18 13.19L16.58 11.76C17.9629 10.8034 19.0783 9.5091 19.82 8C19.0117 6.34987 17.7565 4.95963 16.1974 3.98735C14.6382 3.01508 12.8375 2.49976 11 2.5C9.91 2.5 8.84 2.68 7.84 3L6.3 1.47C7.74 0.85 9.33 0.5 11 0.5ZM2.18 8C2.98835 9.65014 4.24345 11.0404 5.80264 12.0126C7.36182 12.9849 9.16251 13.5002 11 13.5C11.69 13.5 12.37 13.43 13 13.29L10.72 11C10.0242 10.9254 9.37482 10.6149 8.87997 10.12C8.38512 9.62518 8.07458 8.97584 8 8.28L4.6 4.87C3.61 5.72 2.78 6.78 2.18 8Z"
                fill="gray"
              />
            </svg>
          )}
        </span>
      </div>
      {error_message && <div className="error-text">{error_message}</div>}
    </div>
  );
};

export default PasswordInput;
