import { createContext } from 'react';
import User from '../types/User';

/**
 * context provider for the app
 * a.k.a. global (app scoped) state
 */
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
