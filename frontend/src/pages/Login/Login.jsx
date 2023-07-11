import { Link } from "react-router-dom";
import "./Login.css";
import { useForm } from "react-hook-form";
import { apiDomain } from "../../../src/utils/utils";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../helpers/Context";
import BeatLoader from "react-spinners/BeatLoader";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { miniMediumUserData, setMiniMediumUserData } = useContext(UserContext);
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    const response = await fetch(`${apiDomain}/users/auth/login`, {
      method: "POST",
      body: JSON.stringify(data),
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const responseData = await response.json();

    if (response.ok) {
      const profile = await fetch(`${apiDomain}/users/profile`, {
        method: "POST",
        body: JSON.stringify(data),
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const profileData = await profile.json();
      if (profileData) {
        setMiniMediumUserData(profileData);
        toast.success("You have successfully logged in");
        navigate("/explore");
      }
    } else {
      toast.error(responseData.message);
    }
    setIsLoading(false);
  };

  return (
    <div className="login-form-container">
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="login-form">
        {isLoading ? (
          <div className="load">
            <BeatLoader />
          </div>
        ) : null}
        <div className="form-group">
          <label htmlFor="email address" className="form-group__label">
            email address
          </label>
          <input
            type="email"
            id="email address"
            className="form-group__text-input"
            placeholder="email address"
            {...register("emailAddress", { required: true })}
          />
        </div>

        <div className="form-group">
          <label htmlFor="password" className="form-group__label">
            password
          </label>
          <input
            type="password"
            id="password"
            className="form-group__text-input"
            placeholder="password"
            {...register("password", { required: true })}
          />
        </div>

        <button type="submit" className="submit-btn">
          login
        </button>
        <p className="form-guide">
          Don't have an account? <Link to="/">Sign Up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
