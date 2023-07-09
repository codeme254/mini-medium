import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { storage } from "../../firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { v4 } from "uuid";

const SignUpForm = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const { register, handleSubmit } = useForm();
  const [isSubmitting, setIsSubmitting] = useState(false)

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
        setIsSubmitting(true)
      const uploadedUrl = await uploadImage();
      if (uploadedUrl) {
        data["profilePicture"] = uploadedUrl;
        console.log(data);
      } else {
        console.log("Avatar URL not available");
      }
    } catch (error) {
      console.log("Error occurred while uploading the avatar:", error);
    }
    setIsSubmitting(false)
  };

  return (
    <div className="sign-up-form-container">
      <h5 className="form-title">Create a free account</h5>
      { isSubmitting ? <p>Please wait as we submit your data to the server...</p> : null }
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
              {...register("firstName")}
            />
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
              {...register("lastName")}
            />
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
            {...register("emailAddress")}
          />
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
            {...register("username")}
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
            {...register("password")}
          />
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
          />
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
          />
        </div>
        <button type="submit" className="submit-btn">
          create account
        </button>
        <p className="form-guide">
          Already have an account? <Link>Login</Link>
        </p>
      </form>
    </div>
  );
};
export default SignUpForm;
