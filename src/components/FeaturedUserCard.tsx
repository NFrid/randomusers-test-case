import { FC } from 'react';
import User from '../types/User';
import UserCard from './UserCard';

interface IFeaturedUserCard {
  user: User;
  removeHandler: () => void
}

const FeaturedUserCard: FC<IFeaturedUserCard> = ({ user, removeHandler }) => {
  return (
    <div className="featured-user">
      <UserCard user={user}/>
      <button onClick={removeHandler}>X</button>
    </div>
  );
};
export default FeaturedUserCard;
