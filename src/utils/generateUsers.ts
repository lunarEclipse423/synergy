import { faker } from "@faker-js/faker";
import { IUser } from "../models/IUser";

const USER_MIN_AGE = 20;
const USER_MAX_AGE = 70;

const createRandomUser = (): IUser => {
  return {
    id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
    age: faker.number.int({ min: USER_MIN_AGE, max: USER_MAX_AGE }),
  };
};

export const generateUsers = (usersNumber: number): IUser[] => {
  const users: IUser[] = faker.helpers.multiple(createRandomUser, {
    count: usersNumber,
  });
  return users;
};
