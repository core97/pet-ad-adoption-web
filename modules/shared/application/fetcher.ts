import { AppClientError } from 'modules/shared/application/errors/app-client-error';

export const fetcher = async <T>(
  url: string,
  init?: RequestInit
): Promise<Exclude<T, void>> => {
  const requestInit: RequestInit = {
    ...(!!Object.keys(init || {}).length && init),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      ...(!!Object.keys(init?.headers || {}).length && init?.headers),
    },
  };

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_HOST}${url}`,
    requestInit
  );

  const contentType =
    res.headers.get('content-type') || res.headers.get('Content-Type');
  const isJson = contentType?.includes('application/json');

  if (!res.ok) {
    const { status } = res;
    const info = isJson ? await res.json() : undefined;

    throw new AppClientError({
      info,
      method: init?.method || 'GET',
      status,
      text: 'An error occurred while fetching the data.',
      url,
    });
  }

  if (!isJson) return undefined as unknown as Exclude<T, void>;

  return res.json();
};
