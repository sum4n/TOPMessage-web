import styles from "./RegisterForm.module.css";

function RegisterForm({ loginLink }) {
  return (
    <div className={styles.registerContainer}>
      <h1>Register</h1>
      <form action="#" method="post" className={styles.registerForm}>
        <div className={styles.formLabel}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.formLabel}>
          <label htmlFor="password">Password:</label>
          <input type="password" id="password" name="password" />
        </div>
        <div className={styles.formLabel}>
          <label htmlFor="confirmPassword">Confirm Password:</label>
          <input type="password" id="confirmPassword" name="confirmPassword" />
        </div>
        <button type="submit" className={styles.registerButton}>
          Register
        </button>
      </form>

      <p>
        Already have an account? <a href={loginLink}>Login</a>
      </p>
    </div>
  );
}

export default RegisterForm;
