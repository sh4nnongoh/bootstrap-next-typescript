import { PrismaClient } from "@prisma/client";
import { data } from "../data/userEvent.json";
export const PRISMA = new PrismaClient();
export const APP_URL = "http://localhost:3000";
export const ADMIN = data[0];
export const USER_ACTIVE = data[1];
export const USER_INACTIVE = data[2];
export const TEST_ACTIVE_USER = {
  email: "testuser@example.com",
  name: "testuser",
  isAdmin: false,
  isActive: true
};
export const GET_TEST_USER = () => PRISMA.userEvent.findMany({
  where: {
    email: {
      equals: TEST_ACTIVE_USER.email
    }
  }
});
