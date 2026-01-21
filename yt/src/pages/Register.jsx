import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegister, useCurrentUser } from "../features/auth/auth.hooks";
import "./styles/auth.css";

const Register = () => {
  const navigate = useNavigate();

  const { data: user } = useCurrentUser();
  const registerMutation = useRegister();

  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    password: "",
  });

  const [avatar, setAvatar] = useState(null);
  const [coverImage, setCoverImage] = useState(null);

  // If already logged in → redirect
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!avatar) {
      alert("Avatar is required");
      return;
    }

    const formData = new FormData();
    formData.append("fullName", form.fullName);
    formData.append("username", form.username);
    formData.append("email", form.email);
    formData.append("password", form.password);
    formData.append("avatar", avatar);

    if (coverImage) {
      formData.append("coverImage", coverImage);
    }

    registerMutation.mutate(formData, {
      onSuccess: () => {
        navigate("/");
      },
    });
  };

  return (
    <div className="auth-container">
      <form
        className="auth-card"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <h2>Create an Account</h2>
        <p className="auth-subtitle">Join the community today</p>

        <div className="auth-field">
          <label>Full Name</label>
          <input
            type="text"
            name="fullName"
            placeholder="e.g. John Doe"
            value={form.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Username</label>
          <input
            type="text"
            name="username"
            placeholder="e.g. johndoe123"
            value={form.username}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Email</label>
          <input
            type="email"
            name="email"
            placeholder="name@example.com"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Password</label>
          <input
            type="password"
            name="password"
            placeholder="Create a strong password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>

        <div className="auth-field">
          <label>Avatar (required)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files[0])}
            required
            className="file-input"
          />
        </div>

        <div className="auth-field">
          <label>Cover Image (optional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setCoverImage(e.target.files[0])}
            className="file-input"
          />
        </div>

        {registerMutation.isError && (
          <div className="auth-error">
            {registerMutation.error?.response?.data?.message ||
              "Registration failed. Please try again."}
          </div>
        )}

        <button
          type="submit"
          className="auth-btn"
          disabled={registerMutation.isLoading}
        >
          {registerMutation.isLoading ? "Creating account..." : "Sign Up"}
        </button>

        <p className="auth-footer">
          Already have an account?{" "}
          <Link to="/login">Sign in</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
