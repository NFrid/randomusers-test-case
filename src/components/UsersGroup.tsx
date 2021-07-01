import { useContext, useEffect, useState } from 'react';
import User from '../types/User';
import AppContext from './AppContext';
import SortedUserCard from './SortedUserCard';

interface IUsersGroup {
  users: User[];
  search: string;
  num: number;
}

const UsersGroup: React.FC<IUsersGroup> = ({ users, search, num }) => {
  const { setDragToFav } = useContext(AppContext);
  const [filtered, setFiltered] = useState(users);
  const [collapse, setCollapse] = useState(false);

  useEffect(() => {
    setFiltered(
      users.filter(
        (user) => `${user.name.first} ${user.name.last}`.indexOf(search) !== -1
      )
    );
  }, [users, search, setFiltered]);

  const handleCollapse = () => {
    setCollapse(!collapse);
  };

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    i: number,
    id: number
  ) => {
    e.dataTransfer.setData('add-favorite', JSON.stringify([i, id]));
    setDragToFav(true);
  };

  const dragEndHandler = () => {
    setDragToFav(false);
  };

  return (
    <div className="users-group">
      <h3
        className={
          'group-header ' +
          (filtered.length === 0 ? 'disabled ' : ' ') +
          (collapse ? 'collapsed ' : ' ')
        }
        onClick={handleCollapse}
      >
        {num * 10 + 1}-{num * 10 + 10}
      </h3>
      <div className={collapse ? 'hideme' : ''}>
        {filtered.map((user) => (
          <SortedUserCard
            user={user}
            highlight={search}
            dragStartHandler={(e) =>
              dragStartHandler(e, num, users.indexOf(user))
            }
            dragEndHandler={() => dragEndHandler()}
            key={user.login.uuid}
          />
        ))}
      </div>
    </div>
  );
};
export default UsersGroup;
