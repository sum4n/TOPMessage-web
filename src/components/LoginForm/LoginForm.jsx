import styles from "./LoginForm.module.css";

function LoginForm({ registerLink }) {
  return (
    <div className={styles.loginContainer}>
      <h1>Log In</h1>
      <form action="#" method="post" className={styles.loginForm}>
        <div className={styles.formLabel}>
          <label htmlFor="email">Email:</label>
          <input type="email" id="email" name="email" />
        </div>
        <div className={styles.formLabel}>
          <label htmlFor="password">Password:</label>
          <input type="text" id="password" name="password" />
        </div>
        <button type="submit" className={styles.loginButton}>
          Log in
        </button>
      </form>

      <p>
        New user? <a href={registerLink}>Register</a>
      </p>
    </div>
  );
}

export default LoginForm;
