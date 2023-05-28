import { USER_SECRET } from '../../config/iron-session';
import { USER_ACTIVE } from './_test-utils';
import loginApi from './login';
jest.mock('../../lib/withIronSession', () => ({
  __esModule: true,
  withSessionRoute: (props: unknown) => props,
}));
describe('/login', () => {
  let status: {};
  let save: () => null;
  beforeEach(async () => {
    save = jest.fn().mockResolvedValue(null);
    status = jest.fn().mockReturnValue({ json: () => null });
  });
  describe('GIVEN no initial state', () => {
    describe('WHEN a POST request is made', () => {
      it('THEN the user gets a session', async () => {
        const req = {
          method: 'POST',
          body: { email: USER_ACTIVE.email, password: USER_SECRET },
          headers: {
            cookie: '',
          },
          session: {
            save,
          },
        };
        const res = {
          status,
        };
        // @ts-ignore
        await loginApi(req, res);
        expect(status).toHaveBeenCalledWith(200);
        expect(save).toHaveBeenCalledTimes(1);
      });
    });
  });
});
