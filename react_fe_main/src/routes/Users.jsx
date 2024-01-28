import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UsersList from '../components/UsersList';

const Users = () => {
  const [showUsers, setShowUsers] = useState(false);

  const handleLoadUsersClick = () => {
    setShowUsers(true);
  };

  return (
    <div>
      <h2>Users</h2>
      <Link onClick={handleLoadUsersClick}>Load Users from Express Backend</Link>
      
      {showUsers && <UsersList />}
    </div>
  );
};

export default Users;
