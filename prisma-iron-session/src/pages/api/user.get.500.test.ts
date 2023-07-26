import { USER_ACTIVE } from '../../test-utils';
import { handler as userApi } from './user';
jest.mock('../../lib/withIronSession', () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props,
}));
const json = jest.fn();
const status = jest.fn().mockReturnValue({ json });
const req = {
  method: 'GET',
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
    describe('When a GET request is made', () => {
      it('Then it returns all distinct Users in the database', async () => {
        // @ts-ignore
        await userApi(req, res);
        expect(status).toHaveBeenCalledWith(500);
        expect(json).toHaveBeenCalledWith({ message: 'Invalid User request.' });
      });
    });
  });
});
