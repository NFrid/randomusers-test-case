import React, { useContext, useState } from 'react';
import User from '../types/User';
import AppContext from './AppContext';
import FavoriteUserCard from './FavoriteUserCard';

/** favorite users zone with all the stuff 👽 */
const FavoriteUsers = () => {
  const { dragToFav, sortedUsers, favoriteUsers, setFavoriteUsers } =
    useContext(AppContext);
  const [dragged, setDragged] = useState<number>(0);

  /** move item in arr from from to to, shifting other elements */
  const moveInArray = (arr: any[], from: number, to: number) => {
    let temp = [...arr];
    const item = temp.splice(from, 1);
    temp.splice(to, 0, item[0]);
    return temp;
  };

  /** add new user to favorites with id / shifts already existing user to id */
  const addFavoriteUser = (user: User, id: number) => {
    if (!favoriteUsers.includes(user))
      setFavoriteUsers(
        moveInArray([...favoriteUsers, user], favoriteUsers.length, id)
      );
    else
      setFavoriteUsers(
        moveInArray(favoriteUsers, favoriteUsers.indexOf(user), id)
      );
  };

  /** removes user from favorites by its id */
  const removeFavoriteUser = (id: number) => {
    setFavoriteUsers(
      favoriteUsers.filter((user) => user !== favoriteUsers[id])
    );
  };

  /** start of dragging! */
  const dragStartHandler = (id: number) => {
    setDragged(id);
  };

  /** sets selected to potential target */
  const dragEnterHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.add('selected');
  };

  /** remove selected from potential target */
  const dragLeaveHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.currentTarget.classList.remove('selected');
  };

  /** preventing all the stuff, just in case */
  const dragOverHandler = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  /** drops item to the target and put it in its place */
  const dropHandler = (e: React.DragEvent<HTMLDivElement>, id: number) => {
    e.preventDefault();
    e.stopPropagation();
    const newFavorite = e.dataTransfer.getData('add-favorite');
    if (newFavorite) {
      const ids: number[] = JSON.parse(newFavorite);
      addFavoriteUser(sortedUsers[ids[0]][ids[1]], id);
    } else {
      setFavoriteUsers(moveInArray(favoriteUsers, dragged, id));
    }
    e.currentTarget.classList.remove('selected');
  };

  return (
    <div
      onDragOver={(e) => dragOverHandler(e)}
      onDrop={(e) => dropHandler(e, favoriteUsers.length)}
      className={'favorite-users column' + (dragToFav ? ' droppable' : '')}
    >
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
