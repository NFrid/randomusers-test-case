import { createContext } from 'react';
import User from '../types/User';

const AppContext = createContext({
  users: Array<User>(),
  setUsers: (_: User[]) => {},
  sortedUsers: Array<User[]>(),
  setSortedUsers: (_: User[][]) => {},
  favoriteUsers: Array<User>(),
  setFavoriteUsers: (_: User[]) => {},
  loading: true,
  setLoading: (_: boolean) => {},
  dragToFav: false,
  setDragToFav: (_: boolean) => {},
});

export default AppContext;
