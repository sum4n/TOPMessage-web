import { useEffect, useState } from "react";

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
          setChats((prev) => [...prev, data.message]);
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
      <div>
        {chats.length === 0 && <p>No messages yet</p>}
        <ul>
          {chats.length > 0 &&
            chats.map((chat) => {
              return (
                <li key={chat.id}>
                  {chat.content}-{chat.createdAT}
                </li>
              );
            })}
        </ul>
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
          {submitErrors.length > 0 && (
            <ul>
              {submitErrors.map((error) => {
                return <li key={error.msg}>{error.msg}</li>;
              })}
            </ul>
          )}
          <button type="submit" disabled={submitLoading}>
            Send
          </button>
        </form>
      </div>
    </>
  );
}
