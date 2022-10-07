import request from "supertest";
import { APP_URL, PRISMA } from "../constants";
import setInitialDbState from "../utils/setInitialDbState";
import withNonAdminSession from "./utils/withNonAdminSession";
const USER_EMAIL = "john@example.com";
const USER_NAME = "john";
const createUserPromise = request(APP_URL)
  .post("/api/create-user")
  .send({ user: { email: USER_EMAIL, name: USER_NAME } })
  .expect(500);
const findUserPromise = PRISMA.userEvent.findMany({
  where: {
    email: {
      equals: USER_EMAIL
    }
  }
});
describe("/create-user", () => {
  beforeEach(() => setInitialDbState());
  describe("Given a non-admin login state", () => {
    describe("When a POST request is made", () => {
      it("Then it does not create User", () => withNonAdminSession(createUserPromise)
        .then((result) => expect(result.body.message).toEqual("Invalid Create User request."))
        .then(() => findUserPromise)
        .then((result) => {
          expect(result.length).toEqual(0);
        }));
    });
  });
});
