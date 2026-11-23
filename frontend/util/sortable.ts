import { Achievement } from "../interfaces/Achievements";

export enum SortOptions {
  Default,
  RaritySteam,
  RarityHunters,
  Name,
  Points,
  PointsSteam,
  UnlockDate,
}

function sortByDefault(a: Achievement, b: Achievement) {
  return a.achievementId - b.achievementId;
}
function sortByRaritySteam(a: Achievement, b: Achievement) {
  const result = a.steamPercentage - b.steamPercentage;
  if (result !== 0) return result;
  return sortByDefault(a, b);
}
function sortByRarityHunters(a: Achievement, b: Achievement) {
  const result = a.localPercentage - b.localPercentage;
  if (result !== 0) return result;
  return sortByDefault(a, b);
}
function sortByName(a: Achievement, b: Achievement) {
  return a.name.localeCompare(b.name);
}
function sortByPoints(a: Achievement, b: Achievement) {
  const result = b.points - a.points;
  if (result !== 0) return result;
  return sortByDefault(a, b);
}
function sortByPointsSteam(a: Achievement, b: Achievement) {
  const result = b.points - a.points;
  if (result !== 0) return result;
  return sortByDefault(a, b);
}
function sortByUnlockDate(a: Achievement, b: Achievement) {
  const aLocked = a.rtUnlocked === 0;
  const bLocked = b.rtUnlocked === 0;
  if (aLocked !== bLocked) return aLocked ? 1 : -1;

  const result = a.rtUnlocked - b.rtUnlocked;
  if (result !== 0) return result;
  return sortByDefault(a, b);
}

export {
  sortByDefault,
  sortByRaritySteam,
  sortByRarityHunters,
  sortByName,
  sortByPoints,
  sortByPointsSteam,
  sortByUnlockDate,
};
