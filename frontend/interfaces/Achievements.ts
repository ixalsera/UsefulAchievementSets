// https://steamhunters.com/api/Help/ResourceModel?modelName=Obtainability
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
