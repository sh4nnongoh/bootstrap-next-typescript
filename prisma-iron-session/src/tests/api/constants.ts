import { PrismaClient } from "@prisma/client";
import { data } from "../data/userEvent.json";
export const PRISMA = new PrismaClient();
export const ADMIN = data[0];
export const USER_ACTIVE = data[1];
export const TEST_REPEATED_USER = data[2];
export const USER_INACTIVE = data[3];
export const TEST_ACTIVE_USER = {
  email: "testuser@example.com",
  name: "testuser",
  isAdmin: false,
  isActive: true
};
export const GET_USER_BY_EMAIL = (email: string) => PRISMA.userEvent.findMany({
  where: {
    email: {
      equals: email
    }
  }
});
export const SET_INITIAL_DB_STATE = () => PRISMA.userEvent.deleteMany()
  .then(() => Promise.all([
    PRISMA.userEvent.create({
      data: ADMIN
    }),
    PRISMA.userEvent.create({
      data: USER_ACTIVE
    }),
    PRISMA.userEvent.create({
      data: USER_INACTIVE
    })
  ]))
  .then(() => PRISMA.userEvent.findMany())
  .then((result) => {
    expect(result.length).toEqual(3);
  })
  .catch((error) => { throw new Error(error); });
