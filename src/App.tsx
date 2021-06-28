import React, { useEffect, useState } from 'react';
import usersApi from './api/users';
import User from './types/User';
import './App.css';

function App() {
  let [users, setUsers] = useState<User[]>();
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    usersApi.getUsers(5).then((users) => {
      setUsers(users);
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      {loading ? (
        <>Loading...</>
      ) : (
        <ul>
          {users?.map((user, id) => (
            <li key={id}>{user.name.first} {user.name.last}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
