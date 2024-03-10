import url from 'url';
interface RequestConfig {
  endpoint: string;
  timeout?: number;
  query?: Record<string, any>;
  data?: BodyInit | null;
  headers?: Record<string, any>;
}

export const httpRequest = async (config: RequestConfig) => {
  const { endpoint, timeout = 5000, query, headers, data } = config;
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);
  const params = url.format({
    query: query
  });
  const res = await fetch(endpoint + params, {
    method: 'GET',
    headers,
    body: data,
    signal: controller.signal
  });
  clearTimeout(id);
  return res;
};


