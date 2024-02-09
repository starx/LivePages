import React, { useEffect, useState } from 'react';
import UsersList from '../components/UsersList';

const Home = () => {
  return (
    <div>
      <h2>Available pages</h2>
      <UsersList />
    </div>
  );
};

export default Home;
