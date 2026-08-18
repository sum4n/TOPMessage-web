import styles from "./ChatHeader.module.css";

function ChatHeader({ user }) {
  return (
    <>
      <header className={styles.header}>
        <p>{user.name ? user.name : user.email}</p>
      </header>
    </>
  );
}

export default ChatHeader;
