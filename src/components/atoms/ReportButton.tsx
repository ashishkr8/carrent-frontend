import React from "react";
import classNames from "classnames";
 
type ButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md";
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};
 
const ReportButton: React.FC<ButtonProps> = ({
    children,
    variant = "primary",
    size = "md",
    disabled = false,
    onClick,
    className = "",
}) => {
    const baseStyles = "rounded-full font-medium transition-all duration-200";
 
    const variantStyles = {
        primary: "bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-300",
        secondary: "bg-transparent text-red-600 border border-red-600 hover:bg-red-100 disabled:border-gray-300 disabled:text-gray-400",
    };
 
    const sizeStyles = {
        sm: "px-3 py-1 text-sm",
        md: "px-4 py-2 text-base",
    };
 
    const combined = classNames(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
    );
 
    return (
        <button className={combined} disabled={disabled} onClick={onClick}>
            {children}
        </button>
    );
};
 
export default ReportButton;
 
 