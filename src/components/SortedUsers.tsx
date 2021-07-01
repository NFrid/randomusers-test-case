import { useContext, useEffect, useState } from 'react';
import User from '../types/User';
import AppContext from './AppContext';
import UsersGroup from './UsersGroup';

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

  useEffect(() => {
    setSortedUsers(sortUsersByDecAge(users));
  }, [users, setSortedUsers]);

  return (
    <div className="sorted-users column">
      <input
        type="text"
        placeholder="Поиск по имени и фамилии..."
        onChange={searchHandler}
      />
      {sortedUsers.map((users, i) => (
        <UsersGroup users={users} search={search} num={i} key={i} />
      ))}
    </div>
  );
};
export default SortedUsers;
