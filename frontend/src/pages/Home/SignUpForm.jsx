import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";
import ClipLoader from "react-spinners/ClipLoader";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiDomain } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const Error = ({ message }) => {
  return <p>{message}</p>;
};

const SignUpForm = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const schema = yup.object().shape({
    firstName: yup
      .string("first name must be a string")
      .required("first name is required")
      .min(2, "First name must be at least 2 characters long"),
    lastName: yup
      .string("Last name must be a string")
      .required("Last name is required")
      .min(2, "Last name must be at least 2 characters long"),
    username: yup
      .string()
      .required("username is required")
      .min(3, "username must be at least 3 characters long"),
    emailAddress: yup
      .string()
      .email("Email should be in a valid format")
      .required("Email is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(8, "Password should be a minimum of 8 characters long"),
    confPass: yup
      .string()
      .oneOf(
        [yup.ref("password"), null],
        "Password and confirm password must match"
      ),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const uploadImage = () => {
    if (!imageUpload) return Promise.resolve(null);

    const imageRef = ref(storage, `avatars/${imageUpload.name + v4()}`);
    return uploadBytes(imageRef, imageUpload)
      .then((snapshot) => {
        return getDownloadURL(snapshot.ref);
      })
      .catch((error) => {
        console.log("Error occurred while uploading the avatar:", error);
        return null;
      });
  };

  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        data["profilePicture"] = uploadedUrl;
        const registerUser = await fetch(`${apiDomain}/users`, {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        const responseData = await registerUser.json();
        console.log(registerUser);
        console.log(responseData);
        if (registerUser.ok) {
          navigate("/login");
        } else {
          alert(`Something went wrong: ${responseData.message}`);
        }
      } else {
        console.log("Avatar URL not available");
      }
    } catch (error) {
      console.log("Error occurred while uploading the avatar:", error);
    }
    setIsSubmitting(false);
  };

  return (
    <div className="sign-up-form-container">
      <h5 className="form-title">Create a free account</h5>
      {isSubmitting ? (
        <div className="loading">
          <ClipLoader
            loading={isSubmitting}
            size={150}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
          <h3>Submitting your information, please wait...</h3>
        </div>
      ) : null}
      <form onSubmit={handleSubmit(onSubmit)} className="sign-up-form">
        <div className="form-group-flex">
          <div className="form-group form-group-width-fix">
            <label htmlFor="firstName" className="form-group__label">
              first name
            </label>
            <input
              type="text"
              id="firstName"
              className="form-group__text-input"
              placeholder="first name"
              {...register("firstName", { required: true })}
            />
            {errors.firstName && <Error message={errors.firstName?.message} />}
          </div>
          <div className="form-group form-group-width-fix">
            <label htmlFor="lastName" className="form-group__label">
              last name
            </label>
            <input
              type="text"
              id="lastName"
              className="form-group__text-input"
              placeholder="last name"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && <Error message={errors.lastName?.message} />}
          </div>
        </div>
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
          {errors.emailAddress && (
            <Error message={errors.emailAddress?.message} />
          )}
        </div>
        <div className="form-group">
          <label htmlFor="username" className="form-group__label">
            pick a username
          </label>
          <input
            type="text"
            id="username"
            className="form-group__text-input"
            placeholder="username"
            {...register("username", { required: true })}
          />
          {errors.username && <Error message={errors.username?.message} />}
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
          {errors.password && <Error message={errors.password?.message} />}
        </div>
        <div className="form-group">
          <label htmlFor="confPass" className="form-group__label">
            confirm password
          </label>
          <input
            type="password"
            id="confPass"
            className="form-group__text-input"
            placeholder="confirm password"
            {...register("confPass", { required: true })}
          />
          {errors.confpass && <Error message={errors.confpass?.message} />}
        </div>
        <div className="form-group">
          <label htmlFor="profilePhoto" className="form-group__label">
            Upload a profile photo
          </label>
          <input
            type="file"
            name=""
            id="profilePhoto"
            onChange={(event) => setImageUpload(event.target.files[0])}
            required
          />
        </div>
        <button type="submit" className="submit-btn">
          create account
        </button>
        <p className="form-guide">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};
export default SignUpForm;
