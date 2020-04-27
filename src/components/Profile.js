import React, { Fragment } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Loading from 'components/Loading';

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading) {
    return <Loading />;
  }

  if (!user) {
    return (
      <Fragment>
        <span>Not logged in</span>
      </Fragment>
    );
  }

  return (
    <Fragment>
      <img src={user.picture} alt="Profile" />

      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <code>{JSON.stringify(user, null, 2)}</code>
    </Fragment>
  );
};

export default Profile;
