import React, { useState, useEffect } from "react";
import { Eye, EyeOff } from "lucide-react";
 
interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  labelClassName?: string;
}
 
const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState("");
 
  // Control the input field type based on password visibility toggle
  const isPassword = type === "password";
  const inputType = isPassword && showPassword ? "text" : type;
  const inputClass = `w-full h-[42px] px-3 text-sm border rounded-md bg-transparent focus:outline-none pr-10 ${
    error ? "border-red-500" : "border-gray-300 focus:border-[#d32f2f]"
  }`;
 
  // Ensure the input value is controlled properly for password fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordValue(e.target.value);
    if (props.onChange) props.onChange(e); // preserve external onChange if passed
  };
 
  // Effect to remove any default browser behavior on first load
  useEffect(() => {
    if (isPassword) {
      // Disable default appearance for the input
      const inputElement = document.querySelector('input[type="password"]');
      if (inputElement) {
        inputElement.setAttribute("style", "appearance: none;");
      }
    }
  }, [isPassword]);
 
 
  return (
    <div className="mb-2 relative">
      <label className={`block text-sm text-[#444] mb-1 ${props.labelClassName ?? "text-sm"}`}>{label}</label>
      <input
        {...props}
        type={inputType}
        className={inputClass}
        onChange={handleInputChange}
        value={props.value ?? passwordValue}
        style={{
          appearance: 'none', // Disable default browser password field appearance
          MozAppearance: 'none',
          WebkitAppearance: 'none',
        }}
      />
      {isPassword && passwordValue && (
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute right-3 top-[42px] transform -translate-y-1/2 text-gray-500"
          tabIndex={-1}
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      )}
      
    </div>
  );
 
};
 
export default InputField;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
 
interface UserInfo {
  idToken: string;
  role: string;
  userId: string;
  userImageUrl: string;
  username: string;
  email: string;
}
 
interface UserState {
  userInfo: UserInfo | null;
}
 
const initialState: UserState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo")!)
    : null,
};
 
export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action: PayloadAction<UserInfo>) => {
      state.userInfo = action.payload;
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    clearUserInfo: (state) => {
      state.userInfo = null;
      localStorage.removeItem("userInfo");
    },
  },
});
 
export const { setUserInfo, clearUserInfo } = userSlice.actions;
// export const  { userSlice }




export type RootState = {
  user: {
    userInfo: {
      userId: string;
      name: string;
      email: string;
      // add other userInfo properties if any
    };
    isLoggedIn: boolean;
  };
};



