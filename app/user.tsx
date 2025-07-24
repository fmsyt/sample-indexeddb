import { useLiveQuery } from 'dexie-react-hooks';
import { db } from './db';
import { defaultUser, type User, type UserRequiredFields } from './types';

export async function getUsers() {
  const users = await db.users.toArray();
  return users;
}

export function useUsers() {
  return useLiveQuery(getUsers);
}

export async function getUser(id: number) {
  const user = await db.users.get(id);
  return user;
}

export async function findUsers(conditions: Partial<User>) {
  const users = await db.users
    .where(conditions)
    .toArray();

  return users;
}

export async function insertUser(user: UserRequiredFields & Partial<User>) {
  const result = await db.users.add({
    ...defaultUser,
    ...user,
  })

  return result;
}

export async function insertUsers(users: (UserRequiredFields & Partial<User>)[]) {
  const results = await db.users.bulkAdd(
    users.map(user => ({
      ...defaultUser,
      ...user,
    }))
  );

  return results;
}

export async function updateUser(id: number, user: Partial<User>) {
  const result = await db.users.update(id, user);
  return result;
}

export async function deleteUser(id: number) {
  const result = await db.users.delete(id);
  return result;
}

