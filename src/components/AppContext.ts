import { createContext } from 'react';
import User from '../types/User';

const AppContext = createContext({
  users: Array<User>(),
  setUsers: (_: User[]) => {},
  sortedUsers: Array<User[]>(),
  setSortedUsers: (_: User[][]) => {},
  featuredUsers: Array<User>(),
  setFeaturedUsers: (_: User[]) => {},
  loading: true,
  setLoading: (_: boolean) => {},
});

export default AppContext;
