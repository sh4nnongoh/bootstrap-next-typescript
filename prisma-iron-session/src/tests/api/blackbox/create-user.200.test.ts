import request from "supertest";
import { APP_URL, PRISMA } from "../constants";
import setInitialDbState from "../utils/setInitialDbState";
import withAdminSession from "./utils/withAdminSession";
const USER_EMAIL = "john@example.com";
const USER_NAME = "john";
const createUserPromise = request(APP_URL)
  .post("/api/create-user")
  .send({ user: { email: USER_EMAIL, name: USER_NAME } })
  .expect(200);
const findUserPromise = PRISMA.userEvent.findMany({
  where: {
    email: {
      equals: USER_EMAIL
    }
  }
});
describe("/create-user", () => {
  beforeEach(() => setInitialDbState());
  describe("Given an admin login state", () => {
    describe("When a POST request is made", () => {
      it("Then it creates User", () => withAdminSession(createUserPromise)
        .then((result) => expect(result.body.message).toEqual(`Created ${USER_NAME}.`))
        .then(() => findUserPromise)
        .then((result) => {
          expect(result.length).toEqual(1);
        }));
    });
  });
});
