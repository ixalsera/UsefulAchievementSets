export interface IGroup {
  name: string;
  dlcAppId: number;
  dlcAppName: string;
  logoAppId: number;
  achievementApiNames: Array<string>;
}

export interface IGroups {
  groupBy: string;
  groups: Array<IGroup>;
}
