import { AnyDto } from '@common/types';
import { faker } from '@faker-js/faker';
import { User } from '@models/users';

export type LoaderData = {
  data: AnyDto<User>[];
};

export default async (): Promise<LoaderData> => {
  const data = new Array(20).fill(0).map(() => {
    const create_time = faker.date.anytime();
    return {
      _id: faker.database.mongodbObjectId(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      name: faker.person.fullName(),
      avatar: faker.image.avatar(),
      status: true,
      create_time,
      update_time: faker.date.past({ refDate: create_time })
    };
  });

  return {
    data
  };
};
