// TODO: Handle cache expiry
export function fetchCachedData(cacheKey: string): string | null {
  return localStorage.getItem(cacheKey);
}

export function storeData(cacheKey: string, data: any) {
  localStorage.setItem(cacheKey, JSON.stringify(data));
}
