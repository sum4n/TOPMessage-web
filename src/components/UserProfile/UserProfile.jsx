import { useState } from "react";

function UserProfile({
  profile,
  updateProfile,
  profileUpdating,
  profileUpdateError,
}) {
  const [name, setName] = useState(profile.name || "");

  return (
    <>
      <div>
        <p>Email:</p>
        <p>{profile.email}</p>
        <hr />
        <p>Name:</p>
        <p>{profile.name || "Set your name"}</p>
        <form onSubmit={(e) => updateProfile(e, name)}>
          <input
            type="text"
            value={name}
            placeholder="Update name"
            onChange={(e) => setName(e.target.value)}
          />
          <button type="submit" disabled={profileUpdating}>
            Update name
          </button>
        </form>
        {profileUpdateError && (
          <ul>
            {profileUpdateError.map((error) => {
              return <li key={error.msg}>{error.msg}</li>;
            })}
          </ul>
        )}
        <hr />
        <p>Joined at:</p>
        <p>{profile.joinedAt}</p>
      </div>
    </>
  );
}

export default UserProfile;
