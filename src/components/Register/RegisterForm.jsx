import styles from "./RegisterForm.module.css";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function RegisterForm({ loginLink }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Derived values
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
  }, [navigate, token]);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    // console.log(email, password);
    fetch(`${API_URL}/users/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => {
        // console.log(response);
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        if (data.errors) {
          setValidationErrors(data.errors);
        } else if (data.error) {
          setError(data.error);
        } else {
          // console.log();
          setEmail("");
          setPassword("");
          setValidationErrors([]);
          setError(null);
          // alert("User has been created");
          navigate("/login", {
            state: { message: "Account created, Please log in." },
          });
        }
      })
      .catch(() => {
        setError("Network error. Please try again.");
      })
      .finally(() => {
        setLoading(false);
      });
  }

  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      <form
        action="#"
        method="post"
        className={styles.registerForm}
        onSubmit={handleSubmit}
      >
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
        <button
          type="submit"
          className={styles.registerButton}
          disabled={loading}
        >
          Register
        </button>
      </form>

      <p>
        Already have an account? <Link to={loginLink}>Login</Link>
      </p>
      {error && <p>{error}</p>}
    </div>
  );
}

export default RegisterForm;
