export type User = {
  name: string;
  favorites: string[];
  coordinates: { x: number; y: number } | null;
}

export type UserRequiredFieldKeys = "name";

export type UserRequiredFields = Pick<User, UserRequiredFieldKeys>;
export type UserOptionalFields = Omit<User, UserRequiredFieldKeys>;

export const defaultUser: UserOptionalFields = {
  favorites: [],
  coordinates: null,
} as const;

export type UserRow = User & {
  id: number;
}
