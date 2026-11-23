import { ErrorBoundary, SteamSpinner } from "millennium";

import { AchievementSets } from "../components/set/AchievementSets";
import { SortAndFilter } from "../components/SortAndFilter";
import { useAchievementData } from "../hooks/useAchievementData";

interface SteamHuntersViewProps {
  appid: number;
}

export function UsableAchievementSetsView({ appid }: SteamHuntersViewProps) {
  const { loading, error, app, sortOrder, setSortOrder } = useAchievementData(appid);

  return (
    <ErrorBoundary>
      {loading ? (
        <SteamSpinner background="transparent" />
      ) : app ? (
        <>
          <SortAndFilter sortBy={sortOrder} onSortSelected={setSortOrder} />
          <AchievementSets sets={app.achievementSets} />
        </>
      ) : (
        <div data-appid={appid}>{error}</div>
      )}
    </ErrorBoundary>
  );
}
