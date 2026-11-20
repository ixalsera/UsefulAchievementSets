interface IGroup {
  Name: string;
  DlcAppId: number;
  DlcAppName: string;
  LogoAppId: number;
  AchievementApiNames: Array<string>;
}

export interface IGroups {
  groupBy: string;
  groups: Array<IGroup>;
}
