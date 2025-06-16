import { cookies } from 'next/headers';

export const getAuthCookieHeader = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  return [
    accessToken && `${accessToken.name}=${accessToken.value}`,
    refreshToken && `${refreshToken.name}=${refreshToken.value}`,
  ]
    .filter(Boolean)
    .join('; ');
};
