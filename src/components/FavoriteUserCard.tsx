import { FC } from 'react';
import User from '../types/User';
import UserCard from './UserCard';

interface IFavoriteUserCard {
  user: User;
  removeHandler: () => void
}

const FavoriteUserCard: FC<IFavoriteUserCard> = ({ user, removeHandler }) => {
  return (
    <div className="favorite-user">
      <UserCard user={user}/>
      <button onClick={removeHandler}>X</button>
    </div>
  );
};
export default FavoriteUserCard;
