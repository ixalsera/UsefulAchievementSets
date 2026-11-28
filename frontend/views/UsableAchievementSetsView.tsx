import { ErrorBoundary, SteamSpinner } from "millennium";
import { useMemo } from "react";

import { AchievementSets } from "../components/set/AchievementSets";
import { UASOptions } from "../components/UASOptions";
import { CollapseProvider } from "../context/CollapseContext";
import { useAchievementData } from "../hooks/useAchievementData";
import { clearCacheForAppId } from "../util/cache";

interface SteamHuntersViewProps {
  appid: number;
}

export function UsableAchievementSetsView({ appid }: SteamHuntersViewProps) {
  const {
    loading,
    error,
    app,
    sortBy,
    setSortBy,
    reverseSort,
    toggleSortOrder,
    hideAchieved,
    toggleAchieved,
    filter,
    setFilter,
    refetch,
  } = useAchievementData(appid);

  const setKeys = useMemo(() => app?.achievementSets.map((s) => s.name) ?? [], [app]);

  const clearCacheAndRefetch = () => {
    clearCacheForAppId(appid);
    refetch();
  };

  return (
    <ErrorBoundary>
      <CollapseProvider keys={setKeys}>
        {loading ? (
          <SteamSpinner background="transparent" />
        ) : app ? (
          <>
            <UASOptions
              sortBy={sortBy}
              sortOrder={reverseSort}
              onSortSelected={setSortBy}
              onToggleSortOrder={toggleSortOrder}
              hideAchievements={hideAchieved}
              onToggleAchieved={toggleAchieved}
              filter={filter}
              onFilterChange={setFilter}
              clearCache={clearCacheAndRefetch}
            />
            <AchievementSets sets={app.achievementSets} />
          </>
        ) : (
          <div data-appid={appid}>{error}</div>
        )}
      </CollapseProvider>
    </ErrorBoundary>
  );
}
