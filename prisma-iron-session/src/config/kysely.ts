'use server';
import {
  Kysely,
  SqliteDialect,
} from 'kysely';
import Database from 'better-sqlite3';
import { DB } from '@/types/schema';
const db = new Kysely<DB>({
  dialect: new SqliteDialect({
    database: new Database('db.sqlite', {}),
  }),
});
export const USER_EVENT_READ = db.selectFrom('UserEvent');
export const USER_EVENT_CREATE = db.insertInto('UserEvent');
