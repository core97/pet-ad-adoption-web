export type UserRole = 'ADMIN' | 'USER';

export type User = Record<string, any> & {
  role?: UserRole;
};
