import { ErrorBoundary, SteamSpinner } from "millennium";

import { AchievementSets } from "../components/AchievementSets";
import { useAchievementData } from "../hooks/useAchievementData";

interface SteamHuntersViewProps {
  appid: number;
}

export function SteamHuntersView({ appid }: SteamHuntersViewProps) {
  const { loading, error, sets } = useAchievementData(appid);

  return (
    <ErrorBoundary>
      {loading ? (
        <SteamSpinner background="transparent" />
      ) : error ? (
        <div data-appid={appid}>{error}</div>
      ) : (
        <AchievementSets sets={sets} />
      )}
    </ErrorBoundary>
  );
}
