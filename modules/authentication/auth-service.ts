import { fetcher } from 'modules/shared/application/fetcher';

export const signIn = async (params: { email: string; password: string }) => {
  const user = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/users/sign-in`,
    {
      credentials: 'include',
      method: 'PUT',
      body: JSON.stringify({ email: params.email, password: params.password }),
    }
  );

  return user;
};

export const signUp = async (params: {
  email: string;
  name: string;
  password: string;
}) => {
  const user = await fetcher(
    `${process.env.NEXT_PUBLIC_API_URL}/users/sign-up`,
    {
      credentials: 'include',
      method: 'POST',
      body: JSON.stringify({
        email: params.email,
        name: params.name,
        password: params.password,
      }),
    }
  );

  return user;
};
