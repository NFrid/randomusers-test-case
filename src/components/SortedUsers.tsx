import { useContext, useEffect, useState } from 'react';
import User from '../types/User';
import AppContext from './AppContext';
import SortedUserCard from './SortedUserCard';

const SortedUsers = () => {
  const { users, sortedUsers, setSortedUsers } = useContext(AppContext);
  const [search, setSearch] = useState('');

  /**
   * sort User[] into User[][index],
   * where index is like 10i + 1 to 10i + 10
   * of their registered.age
   */
  const sortUsersByDecAge = (users: User[]) => {
    let sorted = Array<User[]>();
    users.forEach((user) => {
      let i = 0;
      for (; user.registered.age > (i + 1) * 10; i++) {}
      sorted[i] ? sorted[i].push(user) : (sorted[i] = [user]);
    });
    return sorted;
  };

  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    i: number,
    id: number
  ) => {
    e.dataTransfer.setData('add-favorite', JSON.stringify([i, id]));
  };

  useEffect(() => {
    setSortedUsers(sortUsersByDecAge(users));
  }, [users, setSortedUsers]);

  return (
    <div className="sorted-users">
      <input type="text" onChange={searchHandler} />
      {sortedUsers.map((users, i) => (
        <div className="users-group" key={i}>
          <h3>
            {i * 10 + 1}-{i * 10 + 10}
          </h3>
          {users
            .filter((user) =>
              `${user.name.first} ${user.name.last}`.includes(search)
            )
            .map((user, id) => (
              <SortedUserCard
                user={user}
                highlight={search}
                dragStartHandler={(e) => dragStartHandler(e, i, id)}
                key={id}
              />
            ))}
        </div>
      ))}
    </div>
  );
};
export default SortedUsers;
