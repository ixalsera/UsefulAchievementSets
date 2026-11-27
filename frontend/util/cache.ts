const CACHE_EXPIRY_OFFSET_MS = 7 * 24 * 60 * 60 * 1000; // 7 Days. Too much? Just right?

export enum CacheType {
  Details = "ach_details",
  Groups = "ach_groups",
  AppInfo = "app_info",
}

export function fetchCachedData(cacheKey: string) {
  const item = localStorage.getItem(cacheKey);
  if (!item) return null;
  const json: { data: any; expiry: number } = JSON.parse(item);
  if (json.expiry < Date.now()) {
    console.log("Cache item expired.");
    return null;
  }

  return json.data;
}

export function storeData(cacheKey: string, data: any) {
  const cacheItem = { data, expiry: Date.now() + CACHE_EXPIRY_OFFSET_MS };
  localStorage.setItem(cacheKey, JSON.stringify(cacheItem));
}

export function clearCacheForAppId(appId: number) {
  clearCachedData(determineCacheKey(CacheType.Details, appId));
  clearCachedData(determineCacheKey(CacheType.Groups, appId));
  clearCachedData(determineCacheKey(CacheType.AppInfo, appId));
}

export function clearCachedData(cacheKey: string): void {
  localStorage.removeItem(cacheKey);
}

export function determineCacheKey(type: CacheType, appId: number) {
  return `sh_${type}_${appId}`;
}
