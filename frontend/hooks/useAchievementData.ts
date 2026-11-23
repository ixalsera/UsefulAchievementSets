import { AppAchievement } from "millennium";
import { useEffect, useMemo, useState } from "react";

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

// Note to self: These are like Vue composables; if you remember those!
export function useAchievementData(appid: number) {
  const [achievementData, setAchievementData] = useState<Array<AchievementDetails>>();
  const [groups, setGroups] = useState<Array<IGroup> | null>(null);
  const [appInfo, setAppInfo] = useState<AppDetails | null>(null);
  const [achievements, setAchievements] = useState<Array<AppAchievement>>();
  const [sortOrder, setSortOrder] = useState<SortOptions>(SortOptions.Default);

  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

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

        switch (sortOrder) {
          case SortOptions.Default:
            cheevs.sort(sortByDefault);
            break;
          case SortOptions.RaritySteam:
            cheevs.sort(sortByRaritySteam);
            break;
          case SortOptions.RarityHunters:
            cheevs.sort(sortByRarityHunters);
            break;
          case SortOptions.Name:
            cheevs.sort(sortByName);
            break;
          case SortOptions.Points:
            cheevs.sort(sortByPoints);
            break;
          case SortOptions.PointsSteam:
            cheevs.sort(sortByPointsSteam);
            break;
          case SortOptions.UnlockDate:
            cheevs.sort(sortByUnlockDate);
            break;
        }

        return {
          name,
          appId,
          isDlc,
          achievements: cheevs,
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

    switch (sortOrder) {
      case SortOptions.Default:
        baseSet.achievements.sort(sortByDefault);
        break;
      case SortOptions.RaritySteam:
        baseSet.achievements.sort(sortByRaritySteam);
        break;
      case SortOptions.RarityHunters:
        baseSet.achievements.sort(sortByRarityHunters);
        break;
      case SortOptions.Name:
        baseSet.achievements.sort(sortByName);
        break;
      case SortOptions.Points:
        baseSet.achievements.sort(sortByPoints);
        break;
      case SortOptions.PointsSteam:
        baseSet.achievements.sort(sortByPointsSteam);
        break;
      case SortOptions.UnlockDate:
        baseSet.achievements.sort(sortByUnlockDate);
        break;
    }

    baseSet = {
      ...baseSet,
      ...determineCompletionStats(baseSet.achievements),
    };

    return {
      ...appInfo,
      achievementSets: [baseSet, ...groupSets],
    };
  }, [achievementData, groups, achievements, appInfo, sortOrder]);

  useEffect(() => {
    let cancelled = false; // ignore the result if the component unmounts first

    Promise.all([
      fetchAchievementDetails(appid).then((result) => {
        if (cancelled) return;
        setAchievementData(result);
      }),
      fetchGroups(appid).then((result) => {
        if (cancelled) return;
        setGroups(result.groups);
      }),
      fetchAppInfo(appid).then((result) => {
        if (cancelled) return;
        setAppInfo(result);
      }),
      fetchUserAchievements(appid).then((result) => {
        if (cancelled) return;
        setAchievements(result);
      }),
    ])
      .then(() => {
        if (cancelled) return;
        setLoading(false);
      })
      .catch((e) => {
        if (cancelled) return;
        setError(String(e));
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [appid]);

  return {
    achievementData,
    groups,
    appInfo,
    loading,
    error,
    achievements,
    app,
    sortOrder,
    setSortOrder,
  };
}
