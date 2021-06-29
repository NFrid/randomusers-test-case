import { useContext } from 'react';
import User from '../types/User';
import AppContext from './AppContext';
import FeaturedUserCard from './FeaturedUserCard';

const FeaturedUsers = () => {
  const { users, featuredUsers, setFeaturedUsers } = useContext(AppContext);

  const addFeaturedUser = (user: User) => {
    setFeaturedUsers([
      ...featuredUsers, user
    ]);
  };

  const removeFeaturedUser = (id: number) => {
    setFeaturedUsers(
      featuredUsers.filter((user) => user !== featuredUsers[id])
    );
  };

  const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e)
    e.preventDefault();
    const user = users.find(user => user.login.uuid === e.dataTransfer.getData('text/plain'))
    if (user) addFeaturedUser(user);
  }

  return (
    <div className="featured-users" onDragEnter={dropHandler}>
      <h2>FEATURED</h2>
      {featuredUsers.map((user, id) => (
        <FeaturedUserCard
          user={user}
          removeHandler={() => removeFeaturedUser(id)}
          key={id}
        />
      ))}
    </div>
  );
};
export default FeaturedUsers;
