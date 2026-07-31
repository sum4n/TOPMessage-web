import Chat from "../Chat/Chat.jsx";
import { useState } from "react";

function ChatList({ data, loading, error }) {
  const [chatId, setChatId] = useState(null);

  function handleClick(e) {
    // console.log(e.target.id);
    setChatId(parseInt(e.target.id));
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  return (
    <>
      {data.length > 0 && (
        <ul>
          {data.map((chat) => {
            return (
              <li key={chat.userId} id={chat.userId} onClick={handleClick}>
                {chat.user}
              </li>
            );
          })}{" "}
        </ul>
      )}
      <Chat id={chatId} />
    </>
  );
}

export default ChatList;
