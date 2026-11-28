export interface IGroup {
  name: string;
  dlcAppId: number;
  dlcAppName: string;
  logoAppId: number;
  achievementApiNames: Array<string>;
}

// https://steamhunters.com/api/Help/Api/GET-GetAchievementGroups-v1_appId_groupBy[0]_groupBy[1]_includeMultiplayerGroup
export interface IGroups {
  groupBy: string;
  groups: Array<IGroup>;
}
