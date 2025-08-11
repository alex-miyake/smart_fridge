/**
 * @file Centralised API logic, includes JWT token handling.
 */

export type CustomHeadersInit = Headers | string[][] | Record<string, string>;

export type ApiOptions = {
  requiresAuth?: boolean;
  headers?: CustomHeadersInit;
  method?: string;
  body?: string;
};

// API function 
export const callApi = async (endpoint: string, options: ApiOptions = {}) => {
  const { headers, ...restOptions } = options;

  const IP_ADDR = process.env.EXPO_PUBLIC_BACKEND_IP; 
  const PORT = process.env.EXPO_PUBLIC_BACKEND_PORT || '3000';
  const BACKEND_URL = `http://${IP_ADDR}:${PORT}`;

  const url = `${BACKEND_URL}${endpoint}`; 
  console.log('Attempting to fetch from URL:', url);

  // Headers
  let headerObject: Record<string, string> = {};
  if (headers && !(headers instanceof Headers) && !Array.isArray(headers)) {
    headerObject = headers as Record<string, string>;
  }
  const newHeaders: Record<string, string> = {
    'Content-Type': 'application/json',
    ...headerObject,
  };

  try {
    const response = await fetch(url, {
      headers: newHeaders,
      ...restOptions, 
    });

    if (!response.ok) {
      let errorData: any = { message: 'An unknown server error occurred.' };
      try {
        errorData = await response.json();
      } catch (parseError) {
        console.warn('Failed to parse error response as JSON:', parseError);
      }
      throw new Error(errorData.message || `HTTP error! Status: ${response.status}`);
    }

    // Return the parsed JSON response

    if (response.status === 204) {
      return null;    // If 204 No Content, return null or empty (for deletion)
    }
    return response.json();
  } catch (networkError: any) {
    console.error('Network or API call error:', networkError);
    throw new Error(`Network error or server unreachable: ${networkError.message}`);
  }
};
