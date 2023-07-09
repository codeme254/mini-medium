import { Link } from "react-router-dom";
import "./Login.css";
const Login = () => {
  return (
    <div className="login-form-container">
      <h2>Login to your account</h2>
      <form action="" className="login-form">
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
