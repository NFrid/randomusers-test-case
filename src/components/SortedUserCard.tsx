import { FC } from 'react';
import User from '../types/User';
import UserCard from './UserCard';

interface ISortedUserCard {
  user: User;
  highlight: string;
  dragStartHandler: (e: React.DragEvent<HTMLDivElement>) => void;
  dragEndHandler: () => void;
}

/** wrapper for UserCard taking dnd handlers and search string */
const SortedUserCard: FC<ISortedUserCard> = ({
  user,
  highlight,
  dragStartHandler,
  dragEndHandler,
}) => {
  return (
    <div
      className="sorted-user selectable"
      draggable
      onDragStart={dragStartHandler}
      onDragEnd={dragEndHandler}
    >
      <UserCard user={user} highlight={highlight} />
    </div>
  );
};
export default SortedUserCard;
