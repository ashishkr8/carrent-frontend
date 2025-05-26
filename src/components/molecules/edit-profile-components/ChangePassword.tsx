import { FormEvent, useState } from "react";
import InputField from "./basicComponent";
import SaveProfileInfoBtn from "./SaveProfileInfoBtn";
import { useAppSelector } from "../../../../ReduxSetup/hooks";
import { selectUserSlice } from "../../../../ReduxSetup/slices/userProfileSlice";

import axios from "axios";
import { BASE_URL } from "../../../../constants";

const ChangePassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const [error, setError] = useState("");
  const [serverError, setServerError] = useState("");

  const userId = useAppSelector(selectUserSlice).clientId;


  const validatePassword = (password: string) => {
    if (password.length < 8) return "Password must be at least 8 characters.";
    if (!/[A-Z]/.test(password)) return "Must contain an uppercase letter.";
    if (!/\d/.test(password)) return "Must contain at least one digit.";
    return "";
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    setServerError("");
      if (newPassword === currentPassword) {
      setError("New password cannot be the same as the current password.");
      return;
    }
    // Validate new password only
    const validationError = validatePassword(newPassword);
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const data = {
        userId,
        currentPassword,
        newPassword,
      };
      const response = await axios.put(`${BASE_URL}/users/${userId}/change-password`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200 || response.status === 201) {
        // Simulate success and reset both fields
        const message = response.data.message;
        // console.log("Password changed successfully:", userData);
        console.log("in password change - ",message);
        alert(message);

        setError("");
        // setShowToast(true);
        // setToastMessage("Congratulations!");
        // setToastSubMessage("The password has been successfully changed");
        setCurrentPassword("");
        setNewPassword("");
      }
    } catch (error: any) {
      if (error.response) {
        setServerError(error.response.data.message || "An error occurred.");
      } else {
        setServerError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="w-full">
      <h1 className="text-3xl font-semibold mb-6">Change Password</h1>

      {/* Form now wraps inputs and submit button */}
      {/* {showToast && (
        <SuccessToast
          message={toastMessage}
          subMessage={toastSubMessage}
          isOpen={showToast}
          onClose={() => setShowToast(false)}
          autoClose={true}
          autoCloseTime={2000}
        />
      )} */}

      <form  className="space-y-4">
        {/* {showToast && (
          <SuccessToast
            isOpen={showToast}
            onClose={() => setShowToast(false)}
            message="Congratulations!"
            subMessage="The password has been successfully changed"
            autoClose={true}
            autoCloseTime={2000}
          />
        )} */}

        <h2 className="text-xl font-medium mb-4">Password</h2>
        <div className="border rounded-lg p-4 border-black mb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="w-full md:w-1/2">
              <InputField
                label="Current Password"
                name="currentPassword"
                type="password"
                placeholder="Enter your password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                error={"error"}
                labelClassName="text-xs"
              />
            </div>
            <div className="w-full md:w-1/2">
              <InputField
                label="New Password"
                name="newPassword"
                type="password"
                placeholder="Create new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                error={"error"}
                labelClassName="text-xs"
              />
            </div>
          </div>

          {/* Error message shown only once below both fields */}
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          {serverError && (
            <p className="text-red-500 text-sm mt-2">{serverError}</p>
          )}
        </div>

        <div className="flex justify-center md:justify-end">
          <SaveProfileInfoBtn label="Change password" onClick={handleSubmit} type="submit" />
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;

// export const  WIN=()=>{
//   return <h1>hii</h1>
// };
