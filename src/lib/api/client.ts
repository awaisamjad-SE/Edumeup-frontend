const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://127.0.0.1:8000';
const IPINFO_TOKEN = import.meta.env.VITE_IPINFO_TOKEN ?? '7d863e1849ce97';
const DEFAULT_COUNTRY = import.meta.env.VITE_DEFAULT_COUNTRY ?? 'US';
const DEFAULT_CURRENCY = import.meta.env.VITE_DEFAULT_CURRENCY ?? 'USD';

const ACCESS_TOKEN_KEY = 'edumeup_access_token';
const REFRESH_TOKEN_KEY = 'edumeup_refresh_token';
const USER_COUNTRY_KEY = 'edumeup_user_country';
const COUNTRY_FETCHED_KEY = 'edumeup_country_fetched';

// Fetch user's country from IPInfo API
const fetchCountryFromIP = async (): Promise<string> => {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3000); // 3 second timeout
    
    const response = await fetch(`https://ipinfo.io/json?token=${IPINFO_TOKEN}`, {
      signal: controller.signal
    });
    clearTimeout(timeoutId);
    
    if (!response.ok) throw new Error('IPInfo request failed');
    
    const data = await response.json();
    const country = data.country?.toUpperCase();
    
    if (country) {
      console.log('🌍 Country detected from IP:', country, '| Country Name:', data.country_name || data.country);
      localStorage.setItem(USER_COUNTRY_KEY, country);
      localStorage.setItem(COUNTRY_FETCHED_KEY, 'true');
      return country;
    }
  } catch (error) {
    console.warn('Failed to detect country from IP (using default):', error instanceof Error ? error.message : 'Unknown error');
  }
  
  // Return default if detection fails
  const defaultCountry = DEFAULT_COUNTRY;
  localStorage.setItem(USER_COUNTRY_KEY, defaultCountry);
  localStorage.setItem(COUNTRY_FETCHED_KEY, 'true');
  return defaultCountry;
};

// Initialize country detection
const initCountryDetection = async (): Promise<string> => {
  // Check if country is already stored
  const stored = localStorage.getItem(USER_COUNTRY_KEY);
  const alreadyFetched = localStorage.getItem(COUNTRY_FETCHED_KEY);
  
  if (stored && alreadyFetched) {
    return stored;
  }

  // Fetch from IP
  return await fetchCountryFromIP();
};

// Store for country state
let currentCountry: string | null = null;
let countryPromise: Promise<string> | null = null;

export const countryStore = {
  getCountry(): string {
    // Return cached country if available
    if (currentCountry) return currentCountry;
    
    // Return stored country immediately (non-blocking)
    const stored = localStorage.getItem(USER_COUNTRY_KEY);
    if (stored) {
      currentCountry = stored;
      return stored;
    }
    
    // Start async detection if not already started
    if (!countryPromise) {
      countryPromise = initCountryDetection().then(country => {
        currentCountry = country;
        return country;
      });
    }
    
    // Return default while detecting
    return DEFAULT_COUNTRY;
  },
  
  async getCountryAsync(): Promise<string> {
    if (currentCountry) return currentCountry;
    
    if (!countryPromise) {
      countryPromise = initCountryDetection();
    }
    
    const country = await countryPromise;
    currentCountry = country;
    return country;
  },
  
  setCountry(country: string) {
    const upperCountry = country.toUpperCase();
    currentCountry = upperCountry;
    localStorage.setItem(USER_COUNTRY_KEY, upperCountry);
    localStorage.setItem(COUNTRY_FETCHED_KEY, 'true');
  },
  
  clear() {
    currentCountry = null;
    countryPromise = null;
    localStorage.removeItem(USER_COUNTRY_KEY);
    localStorage.removeItem(COUNTRY_FETCHED_KEY);
  },
};

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

  // Add user's country to request headers for country-specific pricing
  // Can be disabled via env variable if backend CORS is not configured yet
  const enableCountryHeader = import.meta.env.VITE_ENABLE_COUNTRY_HEADER !== 'false';
  if (enableCountryHeader && !headers.has('X-Country-Code')) {
    headers.set('X-Country-Code', countryStore.getCountry());
  }

  let body: BodyInit | undefined;
  if (typeof options.body === 'string' || options.body instanceof FormData) {
    body = options.body;
  } else if (isPlainObject(options.body)) {
    headers.set('Content-Type', 'application/json');
    body = JSON.stringify(options.body);
  }

  let response: Response;
  try {
    response = await fetch(url, {
      ...options,
      headers,
      body,
    });
  } catch (networkError) {
    console.error('Network error:', url, networkError);
    const error: ApiError = {
      message: `Cannot connect to server. Is the backend running at ${API_BASE_URL}?`,
      status: 0,
      details: networkError,
    };
    throw error;
  }

  if (!response.ok) {
    let errorDetails: unknown = undefined;
    try {
      errorDetails = await response.json();
    } catch {
      try {
        errorDetails = await response.text();
      } catch {
        errorDetails = 'No error details available';
      }
    }

    // Handle 401 unauthorized - clear tokens
    if (response.status === 401) {
      tokenStore.clear();
      if (typeof window !== 'undefined' && !window.location.pathname.includes('/login')) {
        window.location.href = '/login';
      }
    }

    console.error('API Error:', {
      url,
      status: response.status,
      statusText: response.statusText,
      details: errorDetails,
    });

    const error: ApiError = {
      message: response.status === 401 
        ? 'Unauthorized - please login again' 
        : `Request failed (${response.status} ${response.statusText})`,
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
