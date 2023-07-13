import { Main } from '@common/api/main';
import { Users } from '@common/api/users';
import { HttpClient } from '@common/http';

const http = new HttpClient('/api', {
  mode: 'cors',
  credentials: 'include'
});

export default {
  main: new Main(http),
  users: new Users(http)
};
