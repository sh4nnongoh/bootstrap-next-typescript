import { USER_ACTIVE } from './_test-utils';
import logoutApi from './logout';
jest.mock('../../lib/withIronSession', () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props,
}));
describe('/logout', () => {
  let status: {};
  let destroy: () => null;
  beforeEach(async () => {
    destroy = jest.fn().mockResolvedValue(null);
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe('GIVEN no initial state', () => {
    describe('WHEN a POST request is made', () => {
      it("THEN the user's session gets destroyed", async () => {
        const req = {
          method: 'POST',
          headers: {
            cookie: '',
          },
          session: {
            user: USER_ACTIVE,
            destroy,
          },
        };
        const res = {
          status,
        };
        // @ts-ignore
        await logoutApi(req, res);
        expect(status).toHaveBeenCalledWith(200);
        expect(destroy).toHaveBeenCalledTimes(1);
      });
    });
  });
});
