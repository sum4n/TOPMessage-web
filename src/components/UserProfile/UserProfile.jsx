function UserProfile({ user }) {
  return (
    <>
      <div>
        <p>Email:</p>
        <p>{user.email}</p>
        <hr />
        <p>Name:</p>
        <p>{user.name || "Set your name"}</p>
        <hr />
        <p>Joined at:</p>
        <p>{user.joinedAt}</p>
      </div>
    </>
  );
}

export default UserProfile;
