import Dexie, { type EntityTable } from 'dexie';
import type { UserRow } from './types';

type DBUser = Dexie & {
  users: EntityTable<UserRow, "id">;
};

const db = new Dexie('MyDatabase') as DBUser;
db.version(1).stores({
  users: "++id, name, favorites, coordinates",
});

export { db };
export type { UserRow };
