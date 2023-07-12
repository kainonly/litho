import { REST } from '@common/rest/rest';
import { http } from '@common/http';
import { User } from '@models/users';

class Users extends REST<User> {}

export const UsersService = new Users(http);
