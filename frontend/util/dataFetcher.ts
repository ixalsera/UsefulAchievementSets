export function getAchievementDetails(appId: number) {
  return backend.getAchievementDetails(appId);
}

export function getGroups(appId: number) {
  return backend.getAchievementGroups(appId);
}

export function getAppInfo(appId: number) {
  return backend.getAppInfo(appId);
}

export function getUserAchievements(appId: number) {
  return SteamClient.Apps.GetMyAchievementsForApp(String(appId));
}
