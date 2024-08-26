export const buildUrl = (url: string, parameters: any): string => {
  let qs = '';
  for (const key in parameters) {
    const value = parameters[key];
    if (value !== '') {
      qs += encodeURIComponent(key) + '=' + encodeURIComponent(value) + '&';
    }
  }
  if (qs.length > 0) {
    qs = qs.substring(0, qs.length - 1);
    url = url + '?' + qs;
  }
  return url;
};
