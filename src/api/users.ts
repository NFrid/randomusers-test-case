import axios from 'axios';
import User from '../types/User';

const usersApi = {
  getUsers: (n: number, nat = 'us'): Promise<User[]> =>
    axios({
      method: 'GET',
      url: `https://randomuser.me/api/?results=${n}&nat=${nat}`,
    }).then(res => res.data.results)
};
export default usersApi;
