import { EAppType, ESteamDeckCompatibilityCategory } from "millennium";

import { AchievementSet } from "./Achievements";

interface Association {
  name: string;
}
interface Tag {
  tagId: number;
  name: string;
}

export interface AppDetails {
  appId: number;
  name: string;
  type: EAppType;
  typeString: string;
  steamDbRating: number;
  playersPerfectedCount: number;
  playersCompletedCount: number;
  playersBaseGameCompletedCount: number;
  playersStartedCount: number;
  playersQualifiedCount: number;
  playerCount: number;
  userCount: number;
  achievementCount: number;
  unobtainableAchievementCount: number;
  points: number;
  fastestCompletionTime: number;
  medianCompletionTime: number;
  releaseDate: string;
  hasAdultOnlySexualContent: boolean;
  hasPaidDlc: boolean;
  isEnglishNotSupported: boolean;
  isExcludedFromGameLibrarySharing: boolean;
  isFree: boolean;
  isRemoved: boolean;
  isRestricted: boolean;
  isVrRequired: boolean;
  steamDeckCompatibilityCategory: ESteamDeckCompatibilityCategory;
  developers: Array<Association>;
  publishers: Array<Association>;
  franchises: Array<Association>;
  tags: Array<Tag>;
}

export interface AppAchievements extends AppDetails {
  achievementSets: Array<AchievementSet>;
}
