import { User } from '@user/types/user';
import { fetcher } from 'modules/shared/application/fetcher';

export const getUserBySession = async (token?: string) => {
  let user: User | null = null;

  if (typeof window !== 'undefined') {
    throw Error('Can only be executed on the server side');
  }

  if (token) {
    user = await fetcher<User | null>(
      `${process.env.NEXT_PUBLIC_API_URL}/users/session/${token}`,
      {
        credentials: 'same-origin',
        method: 'GET',
        cache: 'no-store',
      }
    );
  }

  return user;
};
