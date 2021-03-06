import { FC } from 'react';
import User from '../types/User';
import UserCard from './UserCard';

interface IFavoriteUserCard {
  user: User;
  removeHandler: () => void;
  dragStartHandler: () => void;
  dragEnterHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragLeaveHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragOverHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dropHandler: (e: React.DragEvent<HTMLDivElement>) => void;
}

/** wrapper for UserCard taking dnd handlers and remove handler */
const FavoriteUserCard: FC<IFavoriteUserCard> = ({
  user,
  removeHandler,
  dragStartHandler,
  dragEnterHandler,
  dragLeaveHandler,
  dragOverHandler,
  dropHandler,
}) => {
  return (
    <div
      className="favorite-user selectable"
      draggable
      onDragStart={dragStartHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
      onDrop={dropHandler}
    >
      <UserCard
        user={user}
        append={<button onClick={removeHandler}>X</button>}
      />
    </div>
  );
};
export default FavoriteUserCard;
