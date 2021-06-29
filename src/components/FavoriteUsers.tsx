import { useContext } from 'react';
import User from '../types/User';
import AppContext from './AppContext';
import FavoriteUserCard from './FavoriteUserCard';

const FavoriteUsers = () => {
  const { users, favoriteUsers, setFavoriteUsers } = useContext(AppContext);

  const addFavoriteUser = (user: User) => {
    setFavoriteUsers([
      ...favoriteUsers, user
    ]);
  };

  const removeFavoriteUser = (id: number) => {
    setFavoriteUsers(
      favoriteUsers.filter((user) => user !== favoriteUsers[id])
    );
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e)
    e.preventDefault();
    const user = users.find(user => user.login.uuid === e.dataTransfer.getData('text/plain'))
    if (user) addFavoriteUser(user);
  }

  return (
    <div className="favorite-users" onDragEnter={dropHandler}>
      <h2>ИЗБРАННЫЕ</h2>
      {favoriteUsers.map((user, id) => (
        <FavoriteUserCard
          user={user}
          removeHandler={() => removeFavoriteUser(id)}
          key={id}
        />
      ))}
    </div>
  );
};
export default FavoriteUsers;
