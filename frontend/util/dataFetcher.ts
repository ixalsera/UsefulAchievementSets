import { AchievementDetails } from "../interfaces/Achievements";
import { AppDetails } from "../interfaces/Apps";
import { IGroups } from "../interfaces/Groups";
import { fetchCachedData, storeData } from "./store";

export async function fetchAchievementDetails(appId: number) {
  const cacheKey = `sh_ach_details_${appId}`;
  const cachedData = fetchCachedData(cacheKey);
  if (cachedData !== null) {
    console.log(`Cached data found for ${cacheKey}!`);
    return JSON.parse(cachedData) as AchievementDetails[];
  }
  console.log(`No cached data found for ${cacheKey}; fetching...`);
  const fetchedData = await backend.getAchievementDetails(appId);
  storeData(cacheKey, fetchedData);
  return fetchedData as unknown as AchievementDetails[];
}

export async function fetchGroups(appId: number) {
  const cacheKey = `sh_ach_groups_${appId}`;
  const cachedData = fetchCachedData(cacheKey);
  if (cachedData !== null) {
    console.log(`Cached data found for ${cacheKey}!`);
    return JSON.parse(cachedData) as IGroups;
  }
  console.log(`No cached data found for ${cacheKey}; fetching...`);
  const fetchedData = await backend.getAchievementGroups(appId);
  storeData(cacheKey, fetchedData);
  return fetchedData as unknown as IGroups;
}

export async function fetchAppInfo(appId: number) {
  const cacheKey = `sh_app_info_${appId}`;
  const cachedData = fetchCachedData(cacheKey);
  if (cachedData !== null) {
    console.log(`Cached data found for ${cacheKey}!`);
    return JSON.parse(cachedData) as AppDetails;
  }
  console.log(`No cached data found for ${cacheKey}; fetching...`);
  const fetchedData = await backend.getAppInfo(appId);
  storeData(cacheKey, fetchedData);
  return fetchedData as unknown as AppDetails;
}

export function fetchUserAchievements(appId: number) {
  // I assume Steam caches this data itself so not going to handle caching here
  return SteamClient.Apps.GetMyAchievementsForApp(String(appId));
}
