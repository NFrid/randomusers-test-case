import { useContext, useEffect, useRef, useState } from 'react';
import User from '../types/User';
import AppContext from './AppContext';
import UsersGroup from './UsersGroup';

/** sorted users zone with all the stuff 👽 */
const SortedUsers = () => {
  const inputRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  // sets event listener for selecting search input when typing
  useEffect(() => {
    document.addEventListener('keydown', () => inputRef.current.focus());
  }, []);

  const { loading, users, sortedUsers, setSortedUsers } =
    useContext(AppContext);
  const [search, setSearch] = useState('');

  /** sort User[] into User[][i], where i is like
   * 10i + 1 to 10i + 10 of their registered.age */
  const sortUsersByDecAge = (users: User[]) => {
    let sorted = Array<User[]>();
    users.forEach((user) => {
      let i = 0;
      for (; user.registered.age > (i + 1) * 10; i++) {}
      sorted[i] ? sorted[i].push(user) : (sorted[i] = [user]);
    });
    return sorted;
  };

  /** sets search string from input value */
  const searchHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  // sorts users whenever they change
  useEffect(() => {
    setSortedUsers(sortUsersByDecAge(users));
  }, [users, setSortedUsers]);

  return (
    <div className="sorted-users column">
      <input
        type="text"
        ref={inputRef}
        placeholder="Поиск по имени и фамилии..."
        onChange={searchHandler}
      />
      {loading ? (
        <div className="loader" />
      ) : (
        sortedUsers.map((users, i) => (
          <UsersGroup users={users} search={search} num={i} key={i} />
        ))
      )}
    </div>
  );
};
export default SortedUsers;
