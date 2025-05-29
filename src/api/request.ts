const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; //환경변수로 분리

/**
 * get, post, patch, delete 요청을 처리하는 객체
 * @param endpoint: api 엔드포인트
 * @param queryParams: 쿼리 파라미터
 * @returns
 */
export const request = {
  get: async (
    endpoint: string,
    queryParams?: Record<string, string | number | Array<string | number>>,
  ) => {
    const queryString = queryParams
      ? '?' +
        Object.entries(queryParams)
          .map(([key, value]) => {
            if (Array.isArray(value)) {
              return `${key}=${value.join(',')}`;
            }
            return `${key}=${value}`;
          })
          .join('&')
      : ''; // ?sort=deadline&order=asc

    const response = await fetch(`${baseUrl}${endpoint}${queryString}`);

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }
    return response.json();
  },

  post: async (endpoint: string, headers: HeadersInit, body: BodyInit) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }
    return response.json();
  },

  patch: async (endpoint: string, headers: HeadersInit, body: object) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }
    return response.json();
  },

  delete: async (endpoint: string) => {
    const response = await fetch(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }
    return response.json();
  },
};
