import { ErrorBoundary, SteamSpinner } from "millennium";

import { Sets } from "../components/set/Sets";
import { useAchievementData } from "../hooks/useAchievementData";

interface SteamHuntersViewProps {
  appid: number;
}

export function SteamHuntersView({ appid }: SteamHuntersViewProps) {
  const { loading, error, app } = useAchievementData(appid);

  return (
    <ErrorBoundary>
      {loading ? (
        <SteamSpinner background="transparent" />
      ) : app ? (
        // TODO: Add a header here
        <Sets sets={app.achievementSets} />
      ) : (
        <div data-appid={appid}>{error}</div>
      )}
    </ErrorBoundary>
  );
}
