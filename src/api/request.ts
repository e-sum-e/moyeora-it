const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL; //환경변수로 분리

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | object;
  credentials?: RequestCredentials;
};

/**
 * 쿼리 파라미터를 처리하는 함수에서 사용
 * @param endpoint api 엔드포인트
 * @param queryParams 쿼리 파라미터
 * @returns 쿼리 파라미터가 있는 엔드포인트
 */
const buildUrl = (
  endpoint: string,
  queryParams?: Record<string, string | number | Array<string | number>>,
) => {
  if (!queryParams) return `${baseUrl}${endpoint}`;
  const queryString = Object.entries(queryParams)
    .map(([key, value]) => {
      const encodedKey = encodeURIComponent(key); // 특수문자, 한글인 경우가 있을 수 있으므로 인코딩
      if (Array.isArray(value)) {
        return `${encodedKey}=${value.map(v => encodeURIComponent(v)).join(',')}`; // 배열 경우 배열 요소 인코딩
      }
      return `${encodedKey}=${encodeURIComponent(value)}`;
    })
    .join('&');
  return `${baseUrl}${endpoint}?${queryString}`;
};


/**
 * 요청 처리 함수
 * @param url 요청 주소
 * @param options 요청 옵션
 * @returns 요청 결과
 */
const fetchHandler = async (
  url: string,
  { method = 'GET', headers, body, credentials = 'same-origin' }: RequestOptions = {},
) => {
  const headersObj = new Headers(headers || {});
  
  // 헤더에 컨텐츠 타입이 있는지 확인
  const contentType = headersObj.get('content-type') || headersObj.get('Content-Type');
  const isJson = contentType?.toLowerCase().includes('application/json');

  const response = await fetch(
    url, {
    method,
    headers: headersObj,
    body: isJson && typeof body === 'object' ? JSON.stringify(body) : (body as BodyInit),
    credentials,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`[${response.status}] ${response.statusText} - ${errorText}`);
  }

  return response.json();
};

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
    options?: Pick<RequestOptions, 'credentials'>,
  ) => {
    const url = buildUrl(endpoint, queryParams);
    return await fetchHandler(url, {
      method: 'GET',
      credentials: options?.credentials ?? 'same-origin', // 기본값 설정
    });
  },
  post: async (endpoint: string, headers: HeadersInit, body: BodyInit, options?: Pick<RequestOptions, 'credentials'>) => {
    return await fetchHandler(`${baseUrl}${endpoint}`, {
      method: 'POST',
      headers,
      body,
      credentials: options?.credentials ?? 'same-origin',
    });
  },
  patch: async (endpoint: string, headers: HeadersInit, body: object, options?: Pick<RequestOptions, 'credentials'>) => {
    return await fetchHandler(`${baseUrl}${endpoint}`, {
      method: 'PATCH',
      headers,
      body,
      credentials: options?.credentials ?? 'same-origin',
    });
  },
  delete: async (endpoint: string, options?: Pick<RequestOptions, 'credentials'>) => {
    return await fetchHandler(`${baseUrl}${endpoint}`, {
      method: 'DELETE',
      credentials: options?.credentials ?? 'same-origin',
    });
  },
};