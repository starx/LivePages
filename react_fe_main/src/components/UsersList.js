import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { fetchUsers } from '../actions/userActions';

const UsersList = ({ users, fetchUsers, error }) => {
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        await fetchUsers().catch((e) => {
            console.log('error');
        });
        setLoading(false);
    };

    useEffect(() => {    
        fetchData();
    }, [fetchUsers]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
      <ul>
        {users.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  users: state.users.users,
  error: state.users.error
});

export default connect(mapStateToProps, { fetchUsers })(UsersList);
