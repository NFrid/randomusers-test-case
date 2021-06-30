import { FC } from 'react';
import User from '../types/User';
import UserCard from './UserCard';

interface ISortedUserCard {
  user: User;
  highlight: string;
  dragStartHandler: (e: React.DragEvent<HTMLDivElement>) => void;
}

const SortedUserCard: FC<ISortedUserCard> = ({
  user,
  highlight,
  dragStartHandler
}) => {
  return (
    <div
      className="sorted-user"
      draggable
      onDragStart={dragStartHandler}
    >
      <UserCard user={user} highlight={highlight} />
    </div>
  );
};
export default SortedUserCard;
