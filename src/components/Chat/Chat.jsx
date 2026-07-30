import { useEffect, useState } from "react";

function Chat({ id }) {
  const token = localStorage.getItem("jwt-token");
  const [chats, setChats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chatContent, setChatContent] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (id === null) return;

    setLoading(true);
    setChats([]);
    fetch(`http://localhost:3000/messages/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setChats(data.messages);
      })
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, [id, token]);

  function handleSubmit(e) {
    e.preventDefault();
    setSubmitLoading(true);
    // console.log(chatContent);
    fetch(`http://localhost:3000/messages/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messageContent: chatContent }),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        // console.log(data);
        setChats((prev) => [...prev, data.message]);
        setChatContent("");
      })
      .catch((error) => setError(error))
      .finally(() => setSubmitLoading(false));
  }

  if (id === null) return <p>Start a conversation</p>;
  if (loading) return <p>Loading...</p>;

  return (
    <>
      <div>
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
            onChange={(e) => setChatContent(e.target.value)}
          />
          <button type="submit" disabled={submitLoading}>
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;
