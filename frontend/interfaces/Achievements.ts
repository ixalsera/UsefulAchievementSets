// https://steamhunters.com/api/Help/ResourceModel?modelName=Obtainability
import { AppAchievement } from "millennium";

enum Obtainability {
  Obtainable,
  BrokenButObtainable,
  ConditionallyObtainable,
  Unobtainable,
}

// https://steamhunters.com/api/Help/ResourceModel?modelName=AchievementDetails
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
  achievements: Achievement[];
  achieved: number;
  completionPercentage: number;
}
