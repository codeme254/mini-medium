import { Link } from "react-router-dom";
const SignUpForm = () => {
  return (
    <div className="sign-up-form-container">
      <h5 className="form-title">Create a free account</h5>
      <form action="" className="sign-up-form">
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
          <input type="file" name="" id="profilePhoto" />
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
