import {
  Kysely,
  SqliteDialect,
} from 'kysely';
import Database from 'better-sqlite3';
import { DB } from './types/schema';
const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database('db.sqlite', {}),
  }),
});
export const USER_EVENT_READ = db.selectFrom('UserEvent');
export const USER_EVENT_CREATE = db.insertInto('UserEvent');
export const ironOptions = {
  cookieName: 'myapp_cookiename',
  password: 'complex_password_at_least_32_characters_long',
  // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
  cookieOptions: {
    secure: process.env.NODE_ENV !== 'development',
  },
};
export const USER_SECRET = 'MY_SECRET';
