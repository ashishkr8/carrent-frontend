import React, { useEffect, useReducer, useState } from "react";
import ImageAuth from "../atoms/Authentication/ImageAuth";
import Input from "../atoms/Authentication/Input";
import PasswordInput from "../atoms/Authentication/PasswordInput";
import RedInputBtn from "../atoms/RedInputBtn";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./css/Login.css";

import { useAlert } from "../../context/alert/useAlert";
import AlertBox from "../../context/alert/AlertBox";
import { useAppDispatch } from "../../../ReduxSetup/hooks";
import { setCurrentUser } from "../../../ReduxSetup/slices/userProfileSlice";
import axios from "axios";
import { BASE_URL } from "../../../constants";

/****** Interfaces *******/
interface UserData {
  email: string;
  password: string;
}

interface ErrorMessages {
  email: string;
  password: string;
}

interface BorderColor {
  email: string;
  password: string;
}

interface SigninState {
  userData: UserData;
  errorMessage: ErrorMessages;
  borderColor: BorderColor;
}

/****** Reducer *******/
const initialState: SigninState = {
  userData: { email: "", password: "" },
  errorMessage: { email: "", password: "" },
  borderColor: { email: "gray", password: "gray" },
};

type Action =
  | { type: "UPDATE_FIELD"; field: keyof UserData; value: string }
  | { type: "SET_ERROR"; field: keyof ErrorMessages; value: string }
  | { type: "SET_BORDER_COLOR"; field: keyof BorderColor; value: string }
  | { type: "RESET_ERRORS" }
  | { type: "RESET_FORM" };

const reducerLogin = (state: SigninState, action: Action): SigninState => {
  switch (action.type) {
    case "UPDATE_FIELD":
      return {
        ...state,
        userData: { ...state.userData, [action.field]: action.value },
      };
    case "SET_ERROR":
      return {
        ...state,
        errorMessage: { ...state.errorMessage, [action.field]: action.value },
      };
    case "SET_BORDER_COLOR":
      return {
        ...state,
        borderColor: { ...state.borderColor, [action.field]: action.value },
      };
    case "RESET_ERRORS":
      return {
        ...state,
        errorMessage: initialState.errorMessage,
        borderColor: initialState.borderColor,
      };
    case "RESET_FORM":
      return initialState;
    default:
      return state;
  }
};

/****** Component *******/
const Login: React.FC = () => {

  const { alert, showAlert } = useAlert();
  const navigate = useNavigate();
  const location = useLocation();

  const dispatchRedux = useAppDispatch();

  const [state, dispatch] = useReducer(reducerLogin, initialState);
  const [loading, setLoading] = useState(false);

  const { userData, errorMessage, borderColor } = state;

  useEffect(() => {
    if (
      location.state?.alertType &&
      location.state?.alertTitle &&
      location.state?.alertDescription
    ) {
      showAlert(
        location.state.alertType,
        location.state.alertTitle,
        location.state.alertDescription
      );
    }
  }, [location.state]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    dispatch({
      type: "SET_ERROR",
      field: name as keyof ErrorMessages,
      value: "",
    });
    dispatch({
      type: "SET_BORDER_COLOR",
      field: name as keyof BorderColor,
      value: "gray",
    });
    dispatch({
      type: "UPDATE_FIELD",
      field: name as keyof UserData,
      value: name === "email" ? value.toLowerCase() : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).*$/;
    dispatch({ type: "RESET_ERRORS" });

    setLoading(true);
    let hasErrors = false;

    /****** Validation *******/
    if (!userData.email) {
      dispatch({
        type: "SET_ERROR",
        field: "email",
        value: "Email is required",
      });
      dispatch({ type: "SET_BORDER_COLOR", field: "email", value: "red" });
      hasErrors = true;
    }

    if (!userData.password || !passwordRegex.test(userData.password)) {
      dispatch({
        type: "SET_ERROR",
        field: "password",
        value: !userData.password
          ? "Password is required"
          : "Password must contain at least one uppercase letter and one digit.",
      });
      dispatch({ type: "SET_BORDER_COLOR", field: "password", value: "red" });
      hasErrors = true;
    }

    if (userData.password.length < 8) {
      dispatch({
        type: "SET_ERROR",
        field: "password",
        value: "Password should contain at least 8 characters.",
      });
      dispatch({ type: "SET_BORDER_COLOR", field: "password", value: "red" });
      hasErrors = true;
    }

    if (hasErrors) {
      setLoading(false);
      return;
    }

    /****** API Request *******/
    try {
      const response = await axios.post(
        `${BASE_URL}/auth/sign-in`,

        {
          email: userData.email,
          password: userData.password,
        },
        {
          validateStatus: () => true,
        }
      );

      if (response.status === 200 && response.data?.idToken) {
        const user = response.data;

        console.log(user);

        localStorage.setItem("user",JSON.stringify(user))
        dispatchRedux(
          setCurrentUser({
            clientId: user.userId,
            username: user.username,
            surname: user.surname,
            imageUrl: user.imageUrl,
            email: user.email || "",
            phone: user.phone || "+38 111 111 11 11",
            role: user.role,
            loginStatus: true,
            address:user.address
          })
        );

        dispatch({ type: "RESET_FORM" });

        console.log(user);
         if (user.role.toLowerCase() === "admin") {
          navigate("/dashboard");
          return;
        }

        const searchParams = new URLSearchParams(location.search);
        const nextPath = searchParams.get("next") || "";
        console.log(nextPath);
        navigate(`/${nextPath}`);
      } else if (response.status === 400 || response.status === 401) {
        const message = response.data?.message || "Invalid email or password.";
        dispatch({ type: "SET_ERROR", field: "email", value: message });
        dispatch({ type: "SET_BORDER_COLOR", field: "email", value: "red" });
        dispatch({ type: "SET_ERROR", field: "password", value: message });
        dispatch({ type: "SET_BORDER_COLOR", field: "password", value: "red" });
      } else {
        showAlert(
          "error",
          "Login Failed",
          response.data?.message || "Unexpected error occurred."
        );
      }
    } catch (err: any) {
      console.error("Error during login:", err);

      if (err.response) {
        showAlert(
          "error",
          "Server Error",
          err.response.data?.message || "An error occurred on the server."
        );
      } else if (err.request) {
        showAlert("error", "Network Error", "Please check your connection.");
      } else {
        showAlert("error", "Unexpected Error", err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="login">
      <ImageAuth />
      <div className="login-right">
        {alert && <AlertBox alert={alert} />}
        <div id="head-log-in">Log in</div>
        <p className="text">Glad to see you again</p>
        <form onSubmit={handleSubmit} id="login-form">
          <div className="login-form-group">
            <Input
              label_head="Email"
              type="email"
              name="email"
              error_message={errorMessage.email}
              border={borderColor.email}
              onChange={handleChange}
              value={userData.email}
              placeholder="Write your email"
            />

            <PasswordInput
              label_head="Password"
              name="password"
              error_message={errorMessage.password}
              border={borderColor.password}
              onChange={handleChange}
              value={userData.password}
              placeholder="Write your password"
            />

            {!errorMessage.password && !errorMessage.email && (
              <div className="text">
                Minimum 8 characters with at least one capital letter and one
                digit
              </div>
            )}

            <div className="form-group">
              <RedInputBtn type="submit" disabled={loading}>
                {loading ? (
                  <span className="loading-text">Loading</span>
                ) : (
                  "Login"
                )}
              </RedInputBtn>
            </div>

            <div id="signup-btn">
              New here?{" "}
              <strong>
                <Link to="/signup">Create an account</Link>
              </strong>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
