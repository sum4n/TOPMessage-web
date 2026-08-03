import styles from "./ChatHeader.module.css";

function ChatHeader({ user }) {
  return (
    <>
      <header className={styles.header}>
        <p>{user.user}</p>
      </header>
    </>
  );
}

export default ChatHeader;
