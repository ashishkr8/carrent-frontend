import React, { useEffect } from "react";
import classNames from "classnames";
 
export type AlertType = "success" | "error";
 
interface AlertProps {
    message: string;
    subMessage?: string;
    type: AlertType;
    onClose: () => void;
    duration?: number; // optional: how long the alert should stay
}
 
const Alert: React.FC<AlertProps> = ({
    message,
    subMessage,
    type,
    onClose,
    duration = 2500, // default 3 seconds
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, duration);
 
        return () => clearTimeout(timer); // clear if component unmounts
    }, [onClose, duration]);
 
    return (
        <div
            className={classNames(
                "inset-0 fixed flex items-start justify-between p-4 border rounded-md shadow-md w-full max-w-xl mx-auto mt-4 transition-al h-fit z-[80]",
                {
                    "bg-green-100 w-20 border-green-400 text-green-800": type === "success",
                    "bg-red-100 w-20 border-red-400 text-red-800": type === "error",
                }
            )}
        >
            <div className="z-[80]">
                <p className="font-semibold">{message}</p>
                {subMessage && <p className="text-sm">{subMessage}</p>}
            </div>
            <button onClick={onClose} className="ml-4 mt-1 text-lg font-bold">
                ×
            </button>
        </div>
    );
};
 
export default Alert;
 