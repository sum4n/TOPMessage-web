function ChatList({ data, loading, error }) {
  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error was encountered</p>;
  return (
    <>
      {data.length > 0 && (
        <ul>
          {data.map((chat) => {
            return <li key={chat.userId}>{chat.user}</li>;
          })}{" "}
        </ul>
      )}
    </>
  );
}

export default ChatList;
