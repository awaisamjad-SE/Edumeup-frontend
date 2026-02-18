const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';

const ACCESS_TOKEN_KEY = 'edumeup_access_token';
const REFRESH_TOKEN_KEY = 'edumeup_refresh_token';

type ApiError = {
  message: string;
  status: number;
  details?: unknown;
};

type ApiFetchOptions = Omit<RequestInit, 'body'> & {
  body?: unknown;
};

const isPlainObject = (value: unknown): value is Record<string, unknown> => {
  return !!value && typeof value === 'object' && !(value instanceof FormData);
};

export const tokenStore = {
  getAccessToken() {
    return sessionStorage.getItem(ACCESS_TOKEN_KEY) || '';
  },
  getRefreshToken() {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY) || '';
  },
  setTokens(access: string, refresh: string) {
    sessionStorage.setItem(ACCESS_TOKEN_KEY, access);
    sessionStorage.setItem(REFRESH_TOKEN_KEY, refresh);
  },
  clear() {
    sessionStorage.removeItem(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};

export const apiFetch = async <T>(path: string, options: ApiFetchOptions = {}): Promise<T> => {
  const url = path.startsWith('http') ? path : `${API_BASE_URL}${path}`;
  const headers = new Headers(options.headers || {});
  const accessToken = tokenStore.getAccessToken();

  if (accessToken && !headers.has('Authorization')) {
    headers.set('Authorization', `Bearer ${accessToken}`);
  }

  let body: BodyInit | undefined;
  if (typeof options.body === 'string' || options.body instanceof FormData) {
    body = options.body;
  } else if (isPlainObject(options.body)) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(options.body);
  }

  const response = await fetch(url, {
    ...options,
    headers,
    body,
  });

  if (!response.ok) {
    let errorDetails: unknown = undefined;
    try {
      errorDetails = await response.json();
    } catch {
      errorDetails = await response.text();
    }

    // Handle 401 unauthorized - clear tokens
    if (response.status === 401) {
      tokenStore.clear();
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    const error: ApiError = {
      message: response.status === 401 ? 'Unauthorized - please login again' : 'Request failed',
      status: response.status,
      details: errorDetails,
    };
    throw error;
  }

  if (response.status === 204) {
    return null as T;
  }

  return response.json() as Promise<T>;
};

export type { ApiError };
