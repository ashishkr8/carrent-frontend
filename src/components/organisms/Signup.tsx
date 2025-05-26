import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import authImage from "../../assets/authorization.png";
import Input from "../atoms/Authentication/Input";
import PasswordInput from "../atoms/Authentication/PasswordInput";
import RedInputBtn from "../atoms/RedInputBtn";
import SecInputBtn from "../atoms/SecInputBtn";

import "./css/Signup.css";
import { useAlert } from "../../context/alert/useAlert";
import AlertBox from "../../context/alert/AlertBox";
import axios from "axios";
import { BASE_URL } from "../../../constants";


interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface ErrorFields {
  [key: string]: string;
}

const initialUserData: UserData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
const initialErrorState: ErrorFields = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup: React.FC = () => {
  const [userData, setUserData] = useState<UserData>(initialUserData);
  const [errors, setErrors] = useState<ErrorFields>({});
  const [borderColors, setBorderColors] = useState<ErrorFields>({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { showAlert, alert } = useAlert();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setBorderColors((prev) => ({ ...prev, [name]: "gray" }));

    console.log(borderColors);
  };

  const validate = () => {
    const newErrors: ErrorFields = {};
    const nameRegex = /^[A-Za-z]+$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).*$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!userData.firstName || !nameRegex.test(userData.firstName)) {
      newErrors.firstName = userData.firstName
        ? "Only Latin letters are allowed"
        : "Name is required";
    }

    if (userData.lastName && !nameRegex.test(userData.lastName)) {
      newErrors.lastName = "Only Latin letters are allowed";
    }

    if (!userData.email) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(userData.email)) {
      newErrors.email = "Enter a valid email address";
    }

    if (userData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!passwordRegex.test(userData.password)) {
      newErrors.password =
        "Password should contain at least one capital letter";
    }

    if (userData.password !== userData.confirmPassword) {
      newErrors.confirmPassword = "Passwords should match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = async() => {
    setUserData(initialUserData);
    setErrors(initialErrorState);
    // setBorderColors({});
    window.location.reload();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!validate()) return;

      
      setLoading(true);
      const newUser = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email.toLowerCase(),
        password: userData.password,
      };
      console.log(newUser);

      await axios.post(`${BASE_URL}/auth/sign-up`,
        newUser
      )

      setTimeout(() => {
        setLoading(false);
        navigate("/login", {
          state: {
            alertType: "success",
            alertTitle: "Congratulations!",
            alertDescription: "You have successfully created your account!",
          },
        });
      }, 2000);

      // Step 7: Reset form to initial state
      setUserData(initialUserData);


    } catch (err: any) {
      if (err.response?.status === 409 || err.response?.status === 400) {
        setErrors({ email: "This email is already registered" });
      } else {
        showAlert(
          "error",
          "Error!",
          "Registration failed. Please try again later."
        );
        console.error("Signup error:", err);
      }

      setLoading(false);
    }
  };
  return (
    <div id="signup">
      <div className="signup-left">
        <img src={authImage} alt="Authorization" id="signup-cars" />
      </div>

      <div className="signup-right">
        {alert && <AlertBox alert={alert} />}
        <div id="head-create-account">Create an Account</div>
        <p className="text">Enter your details below to get started</p>

        <form onSubmit={handleSubmit} id="signup-form">
          <div className="form-group">
            <Input
              width="50%"
              label_head="Name"
              name="firstName"
              value={userData.firstName}
              onChange={handleChange}
              error_message={errors.firstName || ""}
              border={errors.firstName ? "red" : "gray"}
              placeholder="Write your name"
            />
            <Input
              width="50%"
              label_head="Surname"
              name="lastName"
              value={userData.lastName}
              onChange={handleChange}
              error_message={errors.lastName || ""}
              border={errors.lastName ? "red" : "gray"}
              placeholder="Write your surname"
            />
          </div>

          <Input
            label_head="Email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            error_message={errors.email || ""}
            border={errors.email ? "red" : "gray"}
            placeholder="Write your email"
          />

          <PasswordInput
            label_head="Password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            error_message={errors.password || ""}
            border={errors.password ? "red" : "gray"}
            placeholder="Create password"
          />

          {!errors.password && (
            <div className="text">
              Minimum 8 charatcers with at least one capital letter and one
              digit
            </div>
          )}

          <PasswordInput
            label_head="Password"
            name="confirmPassword"
            value={userData.confirmPassword}
            onChange={handleChange}
            error_message={errors.confirmPassword || ""}
            border={errors.confirmPassword ? "red" : "gray"}
            placeholder="Confirm password"
          />

          <div className="form-group">
            <SecInputBtn value="Cancel" onClick={handleCancel} />
            <RedInputBtn type="submit" disabled={loading}>
              {loading ? (
                <span className="loading-text">Loading</span>
              ) : (
                "Register"
              )}
            </RedInputBtn>
          </div>

          <div id="login-btn">
            Already here?{" "}
            <strong>
              <Link to="/login">Log in</Link>
            </strong>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
