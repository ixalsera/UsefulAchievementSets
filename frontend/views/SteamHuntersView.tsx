import { ErrorBoundary, SteamSpinner } from "millennium";

import { AppInfo } from "../components/AppInfo";
import { GroupsInfo } from "../components/GroupsInfo";
import { useAchievementData } from "../hooks/useAchievementData";

interface SteamHuntersViewProps {
  appid: number;
}

export function SteamHuntersView({ appid }: SteamHuntersViewProps) {
  const { achievementData, groups, appInfo, loading, error, achievements } = useAchievementData(appid)

  return (
    <ErrorBoundary>
      {loading ? (
        <SteamSpinner background="transparent" />
      ) : error ? (
        <div data-appid={appid}>{error}</div>
      ) : (
        <>
          <div>{JSON.stringify(achievementData)}</div>
          <div>{JSON.stringify(achievements)}</div>
          <GroupsInfo groups={groups} />
          <AppInfo details={appInfo} />
        </>
      )}
    </ErrorBoundary>
  );
}
