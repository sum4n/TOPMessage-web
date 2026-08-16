import { useState } from "react";

function UserProfile({
  profile,
  updateProfile,
  profileUpdating,
  profileUpdateError,
  profileUpdatingGeneralError,
}) {
  return (
    <>
      <div>
        <p>Email:</p>
        <p>{profile.email}</p>
        <hr />

        <ProfileName
          profile={profile}
          updateProfile={updateProfile}
          profileUpdating={profileUpdating}
        />

        {profileUpdateError && (
          <ul>
            {profileUpdateError.map((error) => {
              return <li key={error.msg}>{error.msg}</li>;
            })}
          </ul>
        )}
        {profileUpdatingGeneralError && (
          <ul>
            <li>Can not update name: {profileUpdatingGeneralError}</li>
          </ul>
        )}
        <hr />
        <p>Joined at:</p>
        <p>{new Date(profile.joinedAt).toLocaleString()}</p>
      </div>
    </>
  );
}

export default UserProfile;

function ProfileName({ profile, updateProfile, profileUpdating }) {
  const [name, setName] = useState(profile.name || "");
  const [hideForm, setHideForm] = useState(true);

  return (
    <>
      <p>Name:</p>
      <div>
        {hideForm && (
          <div>
            <p>{profile.name || "Set your name"}</p>
            <button onClick={() => setHideForm(false)}>
              {profile.name ? "Edit" : "Set name"}
            </button>
          </div>
        )}{" "}
        {!hideForm && (
          <form onSubmit={(e) => updateProfile(e, name)}>
            <input
              type="text"
              value={name}
              placeholder="Name"
              onChange={(e) => setName(e.target.value)}
            />
            <button type="submit" disabled={profileUpdating}>
              Save
            </button>
            <button
              type="button"
              onClick={() => setHideForm(true)}
              disabled={profileUpdating}
            >
              Close
            </button>
          </form>
        )}{" "}
      </div>
    </>
  );
}
