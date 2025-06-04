import { cookies } from 'next/headers';
import { UserInfoResponse } from '@/types/response';

const checkAuthCookie = async () => {
  const cookieStore = await cookies();

  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');

  // ISSUE: REFRESH 처리가 잘못되어있습니다.
  if (!accessToken || !refreshToken) {
    return false;
  }

  let cookieString = '';

  if (accessToken) {
    cookieString += `${process.env.ACCESS_TOKEN}=${accessToken.value}; `;
  }
  if (refreshToken) {
    cookieString += `${process.env.REFRESH_TOKEN}=${refreshToken.value}; `;
  }

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/v1/user/info',
      {
        headers: {
          Cookie: cookieString,
        },
      },
    );

    if (!response.ok) {
      return false;
      throw new Error('Failed to fetch user info');
    }

    const responseBody: UserInfoResponse = await response.json();

    return responseBody.status.success;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export default checkAuthCookie;
