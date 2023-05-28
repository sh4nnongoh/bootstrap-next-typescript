import {
  GET_USER_BY_EMAIL, TEST_ACTIVE_USER, USER_ACTIVE,
} from './_test-utils';
import { handler as userApi } from './user';
jest.mock('../../lib/withIronSession', () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props,
}));
const status = jest.fn().mockReturnValue({ json: () => null });
const req = {
  method: 'POST',
  body: { user: TEST_ACTIVE_USER },
  headers: {
    cookie: '',
  },
  session: {
    user: USER_ACTIVE,
  },
};
const res = {
  status,
};
describe('/user', () => {
  describe('Given a non-admin login state', () => {
    describe('When a POST request is made, containing a test user', () => {
      it('Then it does not create the User', async () => {
        // @ts-ignore
        await userApi(req, res);
        expect(status).toHaveBeenCalledWith(500);
        const dbResult = await GET_USER_BY_EMAIL(TEST_ACTIVE_USER.email);
        expect(dbResult.length).toBe(0);
      });
    });
  });
});
