import {
  ADMIN, GET_USER_BY_EMAIL, TEST_REPEATED_USER,
} from './_test-utils';
import { handler as userApi } from './user';
jest.mock('../../lib/withIronSession', () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props,
}));
const status = jest.fn().mockReturnValue({ json: () => null });
const req = {
  method: 'POST',
  body: {
    user: {
      name: TEST_REPEATED_USER.name,
      email: TEST_REPEATED_USER.email,
    },
  },
  headers: {
    cookie: '',
  },
  session: {
    user: ADMIN,
  },
};
const res = {
  status,
};
describe('/user', () => {
  describe('Given an admin login state', () => {
    describe('When a POST request is made, containing a test user', () => {
      // @ts-ignore
      beforeAll(() => userApi(req, res));
      it('Then it creates User', async () => {
        expect(status).toHaveBeenCalledWith(200);
        const dbResult = await GET_USER_BY_EMAIL(TEST_REPEATED_USER.email);
        expect(dbResult.length).toBe(2);
        expect(dbResult[0].userId).toBe(dbResult[1].userId);
      });
    });
  });
});
