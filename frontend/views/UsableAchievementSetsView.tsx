import { ErrorBoundary, SteamSpinner } from "millennium";

import { AchievementSets } from "../components/set/AchievementSets";
import { useAchievementData } from "../hooks/useAchievementData";

interface SteamHuntersViewProps {
  appid: number;
}

export function UsableAchievementSetsView({ appid }: SteamHuntersViewProps) {
  const { loading, error, app } = useAchievementData(appid);

  return (
    <ErrorBoundary>
      {loading ? (
        <SteamSpinner background="transparent" />
      ) : app ? (
        // TODO: Add a header here
        <AchievementSets sets={app.achievementSets} />
      ) : (
        <div data-appid={appid}>{error}</div>
      )}
    </ErrorBoundary>
  );
}
