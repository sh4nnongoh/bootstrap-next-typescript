import {
  ADMIN, USER_ACTIVE, USER_INACTIVE
} from "./constants";
import { handler as userApi } from "../../pages/api/user";
const json = jest.fn();
const status = jest.fn().mockReturnValue({ json });
const req = {
  method: "GET",
  headers: {
    cookie: ""
  },
  session: {
    user: ADMIN
  }
};
const res = {
  status
};
describe("/user", () => {
  describe("Given an admin login state", () => {
    describe("When a GET request is made", () => {
      it("Then it returns all distinct Users in the database", async () => {
        // @ts-ignore
        await userApi(req, res);
        expect(status).toHaveBeenCalledWith(200);
        expect(json).toHaveBeenCalledWith({
          data: {
            [ADMIN.userId]: expect.objectContaining(ADMIN),
            [USER_ACTIVE.userId]: expect.objectContaining(USER_ACTIVE),
            [USER_INACTIVE.userId]: expect.objectContaining(USER_INACTIVE)
          }
        });
      });
    });
  });
});
