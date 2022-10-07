import {
  GET_TEST_USER, TEST_ACTIVE_USER, USER_ACTIVE
} from "./constants";
import setInitialDbState from "./utils/setInitialDbState";
import { handler as createUserApi } from "../../pages/api/create-user";
describe("/create-user", () => {
  let status: {};
  beforeEach(async () => {
    status = jest.fn().mockReturnValue({ json: () => null });
    await setInitialDbState();
  });
  describe("Given an admin login state", () => {
    describe("When a POST request is made", () => {
      it("Then it creates User", async () => {
        const req = {
          method: "POST",
          body: { user: TEST_ACTIVE_USER },
          headers: {
            cookie: ""
          },
          session: {
            user: USER_ACTIVE
          }
        };
        const res = {
          status
        };
        // @ts-ignore
        await createUserApi(req, res);
        expect(status).toHaveBeenCalledWith(500);
        const dbResult = await GET_TEST_USER();
        expect(dbResult.length).toBe(0);
      });
    });
  });
});
