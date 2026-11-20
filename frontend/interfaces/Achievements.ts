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

export interface IAchievementSet {
  name: string;
  achievements: Achievement[];
}
