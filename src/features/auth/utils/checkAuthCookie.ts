import { cookies } from 'next/headers';
import { UserInfoResponse } from '@/types/response';

const checkAuthCookie = async () => {
  const cookieStore = await cookies();
  const stringCookie = cookieStore.toString();

  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_BASE_URL + '/v1/user/info',
      {
        headers: {
          Cookie: stringCookie,
        },
      },
    );

    if (!response.ok) {
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
