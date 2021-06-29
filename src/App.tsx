import { useEffect, useState } from 'react';
import usersApi from './api/users';
import User from './types/User';
import './App.css';
import SortedUsers from './components/SortedUsers';
import FeaturedUsers from './components/FeaturedUsers';
import AppContext from './components/AppContext';

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [sortedUsers, setSortedUsers] = useState<User[][]>([]);
  const [featuredUsers, setFeaturedUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  const context = { 
    users, setUsers,
    sortedUsers, setSortedUsers,
    featuredUsers, setFeaturedUsers,
    loading, setLoading
  }

  useEffect(() => {
    usersApi.getUsers(5).then((users) => {
      setUsers(users);
      setFeaturedUsers([users[2], users[4]])
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
            <FeaturedUsers />
          </div>
        )}
      </AppContext.Provider>
    </div>
  );
}

export default App;
