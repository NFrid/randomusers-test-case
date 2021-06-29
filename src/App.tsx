import { useEffect, useState } from 'react';
import usersApi from './api/users';
import User from './types/User';
import './App.css';
import SortedUsers from './components/SortedUsers';
import FavoriteUsers from './components/FavoriteUsers';
import AppContext from './components/AppContext';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortedUsers, setSortedUsers] = useState<User[][]>([]);
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const context = { 
    users, setUsers,
    sortedUsers, setSortedUsers,
    favoriteUsers, setFavoriteUsers,
    loading, setLoading
  }

  useEffect(() => {
    usersApi.getUsers(5).then((users) => {
      setUsers(users);
      setFavoriteUsers([users[2], users[4]])
      setLoading(false);
    });
  }, []);

  return (
    <div className="App">
      <AppContext.Provider value={context}>
        {loading ? (
          <>Loading...</>
        ) : (
          <div className="users-ui">
            <SortedUsers />
            <FavoriteUsers />
          </div>
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
