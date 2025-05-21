const baseUrl = `https://moyeora-it/api`; // 임시로 만든 url

export const request = {
  get: async (url: string, queryParams?: Record<string, string | number>) => {
    const queryString = queryParams
      ? '?' +
        Object.entries(queryParams)
          .map(([key, value]) => `${key}=${value}`)
          .join('&')
      : ''; // ?sort=deadline&order=asc

    const response = await fetch(`${baseUrl}/${url}${queryString}`);

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }
    return response.json();
  },

  post: async (
    url: string,
    headers: HeadersInit,
    body: BodyInit,
    id?: string,
  ) => {
    const response = await fetch(`${baseUrl}/${url}${id ? `/${id}` : ''}`, {
      method: 'POST',
      headers,
      body,
    });

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }
    return response.json();
  },

  patch: async (url: string, body: object, id?: string) => {
    const response = await fetch(`${baseUrl}/${url}/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }
    return response.json();
  },

  delete: async (url: string, id?: string) => {
    const response = await fetch(`${baseUrl}/${url}/${id}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error('Unexpected Error');
    }
    return response.json();
  },
};
