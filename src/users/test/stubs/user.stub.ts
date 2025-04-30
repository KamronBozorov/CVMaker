import { User } from 'src/users/models/user.model';

export const UsersStub = (): Partial<User> => {
  return {
    id: 3,
    first_name: 'Kamronbek',
    email: 'kamronbek@gmail.com',
    hashed_password: `1deb44a9-85b1-48b8-a7f8-745a54b8103c`,
    phone: '+9983181006',
  };
};
