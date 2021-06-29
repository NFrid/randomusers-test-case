import { useContext, useState } from 'react';
// import User from '../types/User';
import AppContext from './AppContext';
import FavoriteUserCard from './FavoriteUserCard';

const FavoriteUsers = () => {
  // const { users, favoriteUsers, setFavoriteUsers } = useContext(AppContext);
  const { favoriteUsers, setFavoriteUsers } = useContext(AppContext);
  const [dragged, setDragged] = useState<number>(0);

  const moveInArray = (arr: any[], from: number, to: number) => {
    let temp = [...arr];
    const item = temp.splice(from, 1);
    temp.splice(to, 0, item[0]);
    return temp;
  };

  // const addFavoriteUser = (user: User) => {
  //   setFavoriteUsers([
  //     ...favoriteUsers, user
  //   ]);
  // };

  const removeFavoriteUser = (id: number) => {
    setFavoriteUsers(
      favoriteUsers.filter((user) => user !== favoriteUsers[id])
    );
  };

  const dragStartHandler = (id: number) => {
    setDragged(id);
  };

  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add('selected')
  };

  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('selected')
  };

  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const dropHandler = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    e.currentTarget.classList.remove('selected')
    setFavoriteUsers(moveInArray(favoriteUsers, dragged, id))
  };

  return (
    <div className="favorite-users">
      <h2>ИЗБРАННЫЕ</h2>
      {favoriteUsers.map((user, id) => (
        <FavoriteUserCard
          user={user}
          removeHandler={() => removeFavoriteUser(id)}
          dragStartHandler={() => dragStartHandler(id)}
          dragEnterHandler={(e) => dragEnterHandler(e)}
          dragLeaveHandler={(e) => dragLeaveHandler(e)}
          dragOverHandler={(e) => dragOverHandler(e)}
          dropHandler={(e) => dropHandler(e, id)}
          key={id}
        />
      ))}
    </div>
  );
};
export default FavoriteUsers;
