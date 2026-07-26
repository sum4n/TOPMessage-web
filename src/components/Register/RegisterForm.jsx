import styles from "./RegisterForm.module.css";
import { Link } from "react-router";
import { useState } from "react";

function RegisterForm({ loginLink }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [validationErrors, setValidationErrors] = useState([]);
  const [error, setError] = useState(null);

  // Derived values
  const emailErrors = validationErrors.filter(
    (error) => error.path === "email",
  );
  const passwordErrors = validationErrors.filter(
    (error) => error.path === "password",
  );

  function handleSubmit(e) {
    e.preventDefault();
    // console.log(e);
    console.log(email, password);
    fetch("http://localhost:3000/users/sign-up", {
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
        console.log(data);
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
          alert("User has been created");
        }
      })
      .catch(() => {
        setError("Network error. Please try again.");
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
            onChange={(e) => setEmail(e.target.value)}
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
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordErrors.length > 0 && (
            <ul>
              {passwordErrors.map((error) => {
                return <li key={error.msg}>{error.msg}</li>;
              })}
            </ul>
          )}
        </div>
        <button type="submit" className={styles.registerButton}>
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
