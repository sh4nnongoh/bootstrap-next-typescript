import { USER_ACTIVE } from "./constants";
import logoutApi from "../../pages/api/logout";
describe("/login", () => {
  let status: {};
  let destroy: () => null;
  beforeEach(async () => {
    destroy = jest.fn().mockResolvedValue(null);
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe("GIVEN no initial state", () => {
    describe("WHEN a POST request is made", () => {
      it("THEN the user's session gets destroyed", async () => {
        const req = {
          method: "POST",
          headers: {
            cookie: ""
          },
          session: {
            user: USER_ACTIVE,
            destroy
          }
        };
        const res = {
          status
        };
        // @ts-ignore
        await logoutApi(req, res);
        expect(status).toHaveBeenCalledWith(200);
        expect(destroy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
