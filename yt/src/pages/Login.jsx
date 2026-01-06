import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLogin, useCurrentUser } from "../features/auth/auth.hooks";
import "./auth.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { data: user } = useCurrentUser();
  const loginMutation = useLogin();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // If already logged in → redirect
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => {
          const redirectTo = location.state?.from || "/";
          navigate(redirectTo, { replace: true });
        },
      }
    );
  };

  return (
    <div className="auth-container">
      <form className="auth-card" onSubmit={handleSubmit}>
        <h2>Login to VidPlay</h2>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {loginMutation.isError && (
          <p className="auth-error">
            {loginMutation.error?.response?.data?.message ||
              "Login failed. Please try again."}
          </p>
        )}

        <button
          type="submit"
          className="auth-btn"
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "Logging in..." : "Login"}
        </button>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
