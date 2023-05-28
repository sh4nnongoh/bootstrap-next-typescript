/* eslint-disable no-console */
import {
  Kysely,
  SqliteDialect,
} from 'kysely';
import Database from 'better-sqlite3';
import { DB } from '../src/types/schema';
// import { createId } from '@paralleldrive/cuid2';
import { data } from './userEvent.json';
const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database('db.sqlite', {}),
  }),
});
console.log(data);
const promises = data.map((datum) => db.insertInto('UserEvent').values(datum).executeTakeFirst());
Promise.all(promises)
  .then(() => {
    console.log('Populated User Event table.');
  })
  .catch((error) => {
    console.error(error);
  });
