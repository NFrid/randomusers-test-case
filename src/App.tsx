import { useEffect, useState } from 'react';
import usersApi from './api/users';
import User from './types/User';
import './App.scss';
import SortedUsers from './components/SortedUsers';
import FavoriteUsers from './components/FavoriteUsers';
import AppContext from './components/AppContext';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortedUsers, setSortedUsers] = useState<User[][]>([]);
  const [favoriteUsers, setFavoriteUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [dragToFav, setDragToFav] = useState(false);

  const context = {
    users,
    setUsers,
    sortedUsers,
    setSortedUsers,
    favoriteUsers,
    setFavoriteUsers,
    loading,
    setLoading,
    dragToFav,
    setDragToFav,
  };

  useEffect(() => {
    usersApi.getUsers(5000).then((users) => {
      setUsers(users);
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
