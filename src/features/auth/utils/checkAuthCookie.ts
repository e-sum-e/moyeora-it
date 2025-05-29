import { cookies } from 'next/headers';

const checkAuthCookie = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get(process.env.ACCESS_TOKEN as string);
  const refreshToken = cookieStore.get(process.env.REFRESH_TOKEN as string);

  return !!(accessToken && refreshToken);
};

export default checkAuthCookie;
