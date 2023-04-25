import { cookies } from 'next/headers';
import { User } from '@user/types/user';
import { fetcher } from 'modules/shared/application/fetcher';

export const getUserBySession = async () => {
  if (typeof window !== 'undefined') {
    throw Error('Can only be executed on the server side');
  }

  const nextCookies = cookies();
  const session = nextCookies.get('session');

  if (!session?.value) {
    throw Error('Not found session cookie');
  }

  const user = await fetcher<User | null>(
    `${process.env.NEXT_PUBLIC_API_URL}/users/session/${session.value}`,
    {
      credentials: 'same-origin',
      method: 'GET',
      cache: 'no-store',
    }
  );

  return user;
};
