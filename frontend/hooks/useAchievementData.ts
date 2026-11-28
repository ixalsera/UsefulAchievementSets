import { AppAchievement } from "millennium";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Achievement, AchievementDetails, AchievementSet } from "../interfaces/Achievements";
import { AppDetails, AppAchievements } from "../interfaces/Apps";
import { IGroup } from "../interfaces/Groups";
import {
  fetchAchievementDetails,
  fetchAppInfo,
  fetchGroups,
  fetchUserAchievements,
} from "../util/dataFetcher";
import {
  sortByDefault,
  sortByName,
  sortByPoints,
  sortByPointsSteam,
  sortByRarityHunters,
  sortByRaritySteam,
  sortByUnlockDate,
  SortOptions,
} from "../util/sortable";

function determineCompletionStats(achievements: Achievement[]) {
  let achieved = 0;
  let completionPercentage = 0;

  for (const cheev of achievements) {
    if (cheev.rtUnlocked) achieved += 1;
  }

  if (achievements && achieved) completionPercentage = (achieved / achievements.length) * 100;

  return {
    achieved,
    completionPercentage,
  };
}

function sortAchievements(
  sortBy: SortOptions,
  achievements: Achievement[],
  reverse: boolean,
): Achievement[] {
  switch (sortBy) {
    case SortOptions.Default:
      achievements.sort((a, b) => {
        return reverse ? sortByDefault(b, a) : sortByDefault(a, b);
      });
      break;
    case SortOptions.RaritySteam:
      achievements.sort((a, b) => {
        return reverse ? sortByRaritySteam(b, a) : sortByRaritySteam(a, b);
      });
      break;
    case SortOptions.RarityHunters:
      achievements.sort((a, b) => {
        return reverse ? sortByRarityHunters(b, a) : sortByRarityHunters(a, b);
      });
      break;
    case SortOptions.Name:
      achievements.sort((a, b) => {
        return reverse ? sortByName(b, a) : sortByName(a, b);
      });
      break;
    case SortOptions.Points:
      achievements.sort((a, b) => {
        return reverse ? sortByPoints(b, a) : sortByPoints(a, b);
      });
      break;
    case SortOptions.PointsSteam:
      achievements.sort((a, b) => {
        return reverse ? sortByPointsSteam(b, a) : sortByPointsSteam(a, b);
      });
      break;
    case SortOptions.UnlockDate:
      achievements.sort((a, b) => {
        return reverse ? sortByUnlockDate(b, a) : sortByUnlockDate(a, b);
      });
      break;
  }

  return achievements;
}

async function loadAchievementData(appId: number) {
  const [details, groups, info, achievements] = await Promise.all([
    fetchAchievementDetails(appId),
    fetchGroups(appId),
    fetchAppInfo(appId),
    fetchUserAchievements(appId),
  ]);
  return { details, groups: groups.groups, info, achievements };
}

// Note to self: These are like Vue composables; if you remember those!
export function useAchievementData(appid: number) {
  const [achievementData, setAchievementData] = useState<Array<AchievementDetails>>();
  const [groups, setGroups] = useState<Array<IGroup> | null>(null);
  const [appInfo, setAppInfo] = useState<AppDetails | null>(null);
  const [achievements, setAchievements] = useState<Array<AppAchievement>>();
  const [sortBy, setSortBy] = useState<SortOptions>(SortOptions.Default);
  const [reverseSort, setReverseSort] = useState<boolean>(false);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => {
    setLoading(true);
    setError(undefined);
    setReloadKey((k) => k + 1);
  }, []);

  const toggleSortOrder = useCallback(() => {
    setReverseSort((s) => !s);
  }, []);

  const app: AppAchievements | null = useMemo(() => {
    if (!achievementData || !achievements || !appInfo) return null;

    let baseSet: AchievementSet = {
      name: appInfo.name,
      appId: appInfo.appId,
      isDlc: false,
      achievements: [],
      achieved: 0,
      completionPercentage: 0,
    };
    let groupSets: AchievementSet[] = [];

    const detailsById = new Map<string, AchievementDetails>(
      achievementData.map((d) => [d.apiName, d]),
    );
    const achievementsById = new Map<string, AppAchievement>(achievements.map((a) => [a.strID, a]));
    const ungrouped = new Set(achievementsById.keys());

    if (groups) {
      groupSets = groups.map((group): AchievementSet => {
        const name = group.dlcAppName ?? group.name;
        const appId = group.dlcAppId ?? appInfo.appId;
        const isDlc = Boolean(group.dlcAppId);
        const cheevs: Achievement[] = [];

        for (const apiName of group.achievementApiNames) {
          const details = detailsById.get(apiName);
          const cheev = achievementsById.get(apiName);
          if (details && cheev) {
            cheevs.push({ ...cheev, ...details });
          }
          ungrouped.delete(apiName);
        }

        const completionStats = determineCompletionStats(cheevs);

        return {
          name,
          appId,
          isDlc,
          achievements: sortAchievements(sortBy, cheevs, reverseSort),
          ...completionStats,
        };
      });
    }

    for (const id of ungrouped) {
      const details = detailsById.get(id);
      const cheev = achievementsById.get(id);
      if (details && cheev) {
        baseSet.achievements.push({ ...cheev, ...details });
      }
    }

    baseSet.achievements = sortAchievements(sortBy, baseSet.achievements, reverseSort);

    baseSet = {
      ...baseSet,
      ...determineCompletionStats(baseSet.achievements),
    };

    return {
      ...appInfo,
      achievementSets: [baseSet, ...groupSets],
    };
  }, [achievementData, groups, achievements, appInfo, sortBy, reverseSort]);

  useEffect(() => {
    let cancelled = false;

    loadAchievementData(appid)
      .then((data) => {
        if (cancelled) return;
        setAchievementData(data.details);
        setGroups(data.groups);
        setAppInfo(data.info);
        setAchievements(data.achievements);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [appid, reloadKey]);

  return {
    achievementData,
    groups,
    appInfo,
    loading,
    error,
    achievements,
    app,
    sortBy,
    setSortBy,
    reverseSort,
    toggleSortOrder,
    refetch,
  };
}
