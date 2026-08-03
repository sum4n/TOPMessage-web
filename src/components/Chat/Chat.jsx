import { useEffect, useState } from "react";
import styles from "./Chat.module.css";

function Chat({ id }) {
  if (id === null) return <p>Start a new conversation</p>;

  return <ChatWindow key={id} id={id} />;
}

export default Chat;

function ChatWindow({ id }) {
  const token = localStorage.getItem("jwt-token");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatContent, setChatContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitErrors, setSubmitErrors] = useState([]);

  // TODO: improve error handling.
  useEffect(() => {
    fetch(`http://localhost:3000/messages/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.status > 400) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setChats(data.messages);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setLoading(false));
  }, [id, token]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);
    fetch(`http://localhost:3000/messages/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageContent: chatContent }),
    })
      .then((response) => {
        if (response.status > 400) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then((data) => {
        if (data.errors) {
          setSubmitErrors(data.errors);
        } else {
          setChats((prev) => [data.message, ...prev]);
          setChatContent("");
        }
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => setSubmitLoading(false));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error.message}</p>;

  return (
    <>
      <div className={styles.chatContainer}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="content"
            value={chatContent}
            onChange={(e) => {
              setChatContent(e.target.value);
              setSubmitErrors([]);
            }}
          />
          <button type="submit" disabled={submitLoading}>
            Send
          </button>
        </form>
        {submitErrors.length > 0 && (
          <ul>
            {submitErrors.map((error) => {
              return <li key={error.msg}>{error.msg}</li>;
            })}
          </ul>
        )}

        {chats.length === 0 && <p>No messages yet</p>}
        <ul className={styles.chatList}>
          {chats.length > 0 &&
            chats.map((chat) => {
              return (
                <li className={styles.chatListItems} key={chat.id}>
                  <p className={styles.chatDate}>
                    {new Date(chat.createdAT).toLocaleDateString()}
                  </p>
                  <p
                    className={`${styles.chatContent} 
                                ${
                                  id === chat.senderId
                                    ? styles.receivedMessage
                                    : styles.sendMessage
                                }`}
                  >
                    {chat.content}{" "}
                    <span className={styles.contentDate}>
                      {new Date(chat.createdAT).toLocaleTimeString()}
                    </span>
                  </p>
                </li>
              );
            })}
        </ul>
      </div>
    </>
  );
}
