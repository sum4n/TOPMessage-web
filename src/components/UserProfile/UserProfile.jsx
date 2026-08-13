function UserProfile({ profile }) {
  return (
    <>
      <div>
        <p>Email:</p>
        <p>{profile.email}</p>
        <hr />
        <p>Name:</p>
        <p>{profile.name || "Set your name"}</p>
        <hr />
        <p>Joined at:</p>
        <p>{profile.joinedAt}</p>
      </div>
    </>
  );
}

export default UserProfile;
