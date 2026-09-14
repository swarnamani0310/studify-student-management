import { useState } from "react";
import {
  LockKeyhole,
  Mail,
  Eye,
  EyeOff,
  LogIn
} from "lucide-react";

function Login({ onLogin }) {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (
      email === "admin@studify.com" &&
      password === "admin123"
    ) {
      setError("");
      onLogin();
    } else {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="login-page">

      <div className="login-card">

        <div className="login-brand">

          <div className="login-brand-mark">
            S
          </div>

          <div>
            <h1>STUDIFY</h1>
            <span>Student Management</span>
          </div>

        </div>

        <div className="login-heading">

          <span className="section-tag">
            ADMIN PORTAL
          </span>

          <h2>Welcome back</h2>

          <p>
            Sign in to manage your student records.
          </p>

        </div>

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          <div className="form-field">

            <label>Email Address</label>

            <div className="input-with-icon">

              <Mail size={17} />

              <input
                type="email"
                placeholder="admin@studify.com"
                value={email}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>

          </div>

          <div className="form-field">

            <label>Password</label>

            <div className="input-with-icon">

              <LockKeyhole size={17} />

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(event) =>
                  setPassword(event.target.value)
                }
              />

              <button
                type="button"
                className="password-toggle"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
              >
                {showPassword ? (
                  <EyeOff size={17} />
                ) : (
                  <Eye size={17} />
                )}
              </button>

            </div>

          </div>

          {error && (
            <div className="login-error">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="login-button"
          >
            <LogIn size={18} />
            Sign In
          </button>

        </form>

        <div className="login-demo">

          <strong>Demo Admin Account</strong>

          <span>
            admin@studify.com
          </span>

          <span>
            Password: admin123
          </span>

        </div>

        <p className="login-footer">
          STUDIFY · Student Management System
        </p>

      </div>

    </div>
  );
}

export default Login;