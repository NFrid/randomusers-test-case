import { useEffect, useState } from 'react';
import User from '../types/User';
import SortedUserCard from './SortedUserCard';

interface IUsersGroup {
  users: User[];
  search: string;
  num: number;
}

const UsersGroup: React.FC<IUsersGroup> = ({ users, search, num }) => {
  const [filtered, setFiltered] = useState(users);

  useEffect(() => {
      setFiltered(
        users.filter(
          (user) => `${user.name.first} ${user.name.last}`.indexOf(search) !== -1
        )
    );
  }, [users, search, setFiltered]);

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    i: number,
    id: number
  ) => {
    e.dataTransfer.setData('add-favorite', JSON.stringify([i, id]));
  };

  return (
    <div className="users-group">
      <h3 className={filtered.length === 0 ? 'disabled' : ''}>
        {num * 10 + 1}-{num * 10 + 10}
      </h3>
      {filtered.map((user, id) => (
          <SortedUserCard
            user={user}
            highlight={search}
            dragStartHandler={(e) => dragStartHandler(e, num, id)}
          />
      ))}
    </div>
  );
};
export default UsersGroup;
