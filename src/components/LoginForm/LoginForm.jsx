import styles from "./LoginForm.module.css";
import { Link, useLocation, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function LoginForm({ registerLink }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const location = useLocation();
  const successMessage = location.state?.message;

  const navigate = useNavigate();

  const emailErrors = validationErrors.filter(
    (error) => error.path === "email",
  );

  const passwordErrors = validationErrors.filter(
    (error) => error.path === "password",
  );

  const token = localStorage.getItem("jwt-token");
  useEffect(() => {
    if (token) {
      navigate("/", { replace: true });
    }
  }, [token, navigate]);

  function handleSumbit(e) {
    e.preventDefault();
    setLoading(true);

    fetch(`${API_URL}/users/log-in`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log(data);
        if (data.errors) {
          setValidationErrors(data.errors);
        } else if (data.error) {
          setError(data.error);
        } else {
          localStorage.setItem("jwt-token", data.token);
          setEmail("");
          setPassword("");
          setValidationErrors([]);
          setError(null);
          // alert("login successful");
          navigate("/");
        }
      })
      .catch(() => setError("Network error. Please try again"))
      .finally(() => setLoading(false));
  }

  return (
    <div className={styles.loginContainer}>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <h1>Log In</h1>
      <form className={styles.loginForm} onSubmit={handleSumbit}>
        <div className={styles.formLabel}>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setValidationErrors((prev) =>
                prev.filter((error) => error.path !== "email"),
              );
              setError(null);
            }}
          />
          {emailErrors.length > 0 && (
            <ul>
              {emailErrors.map((error) => {
                return <li key={error.msg}>{error.msg}</li>;
              })}
            </ul>
          )}
        </div>
        <div className={styles.formLabel}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              setValidationErrors((prev) =>
                prev.filter((error) => error.path !== "password"),
              );
              setError(null);
            }}
          />
          {passwordErrors.length > 0 && (
            <ul>
              {passwordErrors.map((error) => {
                return <li key={error.msg}>{error.msg}</li>;
              })}
            </ul>
          )}
        </div>
        <button type="submit" className={styles.loginButton} disabled={loading}>
          Log in
        </button>
      </form>

      <p>
        New user? <Link to={registerLink}>Register</Link>
      </p>
    </div>
  );
}

export default LoginForm;
