import { AppAchievement } from "millennium";

export enum Obtainability {
  Obtainable,
  BrokenButObtainable,
  ConditionallyObtainable,
  Unobtainable,
}

// https://steamhunters.com/api/Help/Api/GET-apps-appId-achievements
export interface AchievementDetails {
  achievementId: number;
  apiName: string;
  name: string;
  description: string;
  steamPercentage: number;
  localPercentage: number;
  points: number;
  steamPoints: number;
  obtainability: Obtainability;
}

export interface Achievement extends AchievementDetails, AppAchievement {}

export interface AchievementSet {
  name: string;
  appId: number;
  isDlc: boolean;
  achievementCount: number;
  achievements: Achievement[];
  achieved: number;
  completionPercentage: number;
}
