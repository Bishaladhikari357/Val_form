import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import "./Loginform.css";

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

function AuthForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [hasAccount, setHasAccount] = useState(true); // true = login, false = signup
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = schema.safeParse(form);
    if (!result.success) {
      setError("Invalid email or password (min 6 characters).");
      return;
    }

    const stored = JSON.parse(localStorage.getItem("user"));

    if (hasAccount) {
      // LOGIN
      if (stored && stored.email === form.email && stored.password === form.password) {
        navigate("/dashboard");
      } else {
        setError("Incorrect email or password.");
      }
    } else {
      // SIGNUP
      if (stored && stored.email === form.email) {
        setError("Account already exists.");
      } else {
        localStorage.setItem("user", JSON.stringify(form));
        setError("Account created successfully! Please log in.");
        setHasAccount(true); // switch to login
        setForm({ email: "", password: "" }); // reset form
      }
    }
  };

  return (
    <div className="container">
      <h2>{hasAccount ? "Login" : "Create Account"}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />
        <button type="submit">{hasAccount ? "Login" : "Sign Up"}</button>
        {error && (
          <p style={{ color: error.includes("successfully") ? "green" : "red" }}>
            {error}
          </p>
        )}
      </form>

      <p>
        {hasAccount ? "Don't have an account?" : "Already have an account?"}{" "}
        <button
          onClick={() => {
            setHasAccount(!hasAccount);
            setError("");
            setForm({ email: "", password: "" });
          }}
          style={{
            border: "none",
            background: "none",
            color: "blue",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          {hasAccount ? "Create one" : "Login here"}
        </button>
      </p>
    </div>
  );
}

export default AuthForm;
