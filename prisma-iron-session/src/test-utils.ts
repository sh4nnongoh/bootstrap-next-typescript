import {
  Kysely,
  SqliteDialect,
} from 'kysely';
import Database from 'better-sqlite3';
import { data } from '../scripts/userEvent.json';
import { DB } from './types/schema';
export const DATABASE = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database('db.sqlite', {}),
  }),
});
export const ADMIN = data[0];
export const USER_ACTIVE = data[1];
export const TEST_REPEATED_USER = data[2];
export const USER_INACTIVE = data[3];
export const TEST_ACTIVE_USER = {
  email: 'testuser@example.com',
  name: 'testuser',
  isAdmin: false,
  isActive: true,
};
export const USER_EVENT_READ = DATABASE.selectFrom('UserEvent');
export const USER_EVENT_CREATE = DATABASE.insertInto('UserEvent');
export const USER_EVENT_DELETE = DATABASE.deleteFrom('UserEvent');
export const GET_USER_BY_EMAIL = (email: string) => USER_EVENT_READ
  .selectAll()
  .orderBy('createdAt', 'desc')
  .where('email', '=', email)
  .execute();
export const SET_INITIAL_DB_STATE = () => USER_EVENT_DELETE.execute()
  .then(() => Promise.all([
    USER_EVENT_CREATE.values({
      ...ADMIN,
    }).executeTakeFirstOrThrow(),
    USER_EVENT_CREATE.values({
      ...USER_ACTIVE,
    }).executeTakeFirstOrThrow(),
    USER_EVENT_CREATE.values({
      ...USER_INACTIVE,
    }).executeTakeFirstOrThrow(),
  ]))
  .then(() => USER_EVENT_READ.selectAll().orderBy('createdAt', 'desc').execute())
  .then((result) => {
    expect(result.length).toEqual(3);
  })
  .catch((error) => { throw new Error(error); });
