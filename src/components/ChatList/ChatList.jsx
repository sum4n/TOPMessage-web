import Chat from "../Chat/Chat.jsx";
import { useState } from "react";
import styles from "./ChatList.module.css";
import Header from "../Header/Header.jsx";

function ChatList({ chats, loading, error }) {
  const [chatId, setChatId] = useState(null);
  // needed for ChatHeader (prop drilling)
  const [chatUser, setChatUser] = useState(null);

  function handleClick(chat) {
    setChatId(chat.userId);
    setChatUser({ user: chat.user, userId: chat.userId });
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  return (
    <>
      <div className={styles.chatListContainer}>
        <Header />
        {chats.length > 0 && (
          <ul className={styles.list}>
            {chats.map((chat) => {
              return (
                <li
                  className={`${chat.userId === chatId ? styles.selected : ""}
                 ${styles.listItems} `}
                  key={chat.userId}
                  id={chat.userId}
                  onClick={() => handleClick(chat)}
                >
                  {chat.user}
                </li>
              );
            })}{" "}
          </ul>
        )}
      </div>{" "}
      <Chat id={chatId} chatUser={chatUser} />
    </>
  );
}

export default ChatList;
