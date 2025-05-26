import React from "react";

interface SaveProfileInfoBtnProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  loading?: boolean;
}

const SaveProfileInfoBtn: React.FC<SaveProfileInfoBtnProps> = ({ label, ...props }) => {
  return (
    <button
      {...props}
      type={props.type || "button"}
      className="w-[150px] bg-[#CC1D1D] text-white py-2 rounded-3xl text-md hover:cursor-pointer hover:bg-[#b31a1a] transition-all duration-200"
    >
      {label}
    </button>
  );
};

export default SaveProfileInfoBtn;
