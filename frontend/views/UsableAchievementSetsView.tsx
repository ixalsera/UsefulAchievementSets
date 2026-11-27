import { ErrorBoundary, SteamSpinner } from "millennium";

import { AchievementSets } from "../components/set/AchievementSets";
import { SortAndFilter } from "../components/SortAndFilter";
import { useAchievementData } from "../hooks/useAchievementData";
import { clearCacheForAppId } from "../util/cache";

interface SteamHuntersViewProps {
  appid: number;
}

export function UsableAchievementSetsView({ appid }: SteamHuntersViewProps) {
  const { loading, error, app, sortOrder, setSortOrder, refetch } = useAchievementData(appid);

  const clearCacheAndRefetch = () => {
    clearCacheForAppId(appid);
    refetch();
  };

  return (
    <ErrorBoundary>
      {loading ? (
        <SteamSpinner background="transparent" />
      ) : app ? (
        <>
          <SortAndFilter
            sortBy={sortOrder}
            onSortSelected={setSortOrder}
            clearCache={clearCacheAndRefetch}
          />
          <AchievementSets sets={app.achievementSets} />
        </>
      ) : (
        <div data-appid={appid}>{error}</div>
      )}
    </ErrorBoundary>
  );
}
