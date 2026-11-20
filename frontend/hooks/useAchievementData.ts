import { AppAchievement } from "millennium";
import { useEffect, useMemo, useState } from "react";

import { Achievement, AchievementDetails, IAchievementSet } from "../interfaces/Achievements";
import { AppDetails } from "../interfaces/Apps";
import { IGroup, IGroups } from "../interfaces/Groups";
import {
  getAchievementDetails,
  getAppInfo,
  getGroups,
  getUserAchievements,
} from "../util/dataFetcher";

// Note to self: These are like Vue composables; if you remember those!
export function useAchievementData(appid: number) {
  const [achievementData, setAchievementData] = useState<Array<AchievementDetails>>();
  const [groups, setGroups] = useState<Array<IGroup> | null>(null);
  const [appInfo, setAppInfo] = useState<AppDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [achievements, setAchievements] = useState<Array<AppAchievement>>();
  const [error, setError] = useState<string>();

  const sets: IAchievementSet[] = useMemo(() => {
    if (!achievementData || !achievements) return [];

    const baseSet: IAchievementSet = {
      name: "Base Game",
      achievements: [],
    };
    let groupSets: IAchievementSet[] = [];

    const detailsById = new Map<string, AchievementDetails>(
      achievementData.map((d) => [d.apiName, d]),
    );
    const achievementsById = new Map<string, AppAchievement>(achievements.map((a) => [a.strID, a]));
    const ungrouped = new Set(achievementsById.keys());

    if (groups) {
      groupSets = groups.map((group) => {
        const name = group.dlcAppName ?? group.name;
        const cheevs: Achievement[] = [];

        for (const apiName of group.achievementApiNames) {
          const details = detailsById.get(apiName);
          const cheev = achievementsById.get(apiName);
          if (details && cheev) {
            cheevs.push({ ...cheev, ...details });
          }
          ungrouped.delete(apiName);
        }

        return {
          name: name,
          achievements: cheevs,
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

    return [baseSet, ...groupSets];
  }, [achievementData, groups, achievements]);

  useEffect(() => {
    let cancelled = false; // ignore the result if the component unmounts first

    // Grab our data then do some horrific Promise chaining. Yuck!
    Promise.all([
      getAchievementDetails(appid).then((result) => {
        if (cancelled) return;
        const achievementData = result as unknown as AchievementDetails[];
        setAchievementData(achievementData);
      }),
      getGroups(appid).then((result) => {
        if (cancelled) return;
        const groupings = result as unknown as IGroups;
        setGroups(groupings.groups);
      }),
      getAppInfo(appid).then((result) => {
        if (cancelled) return;
        const appInfo = result as unknown as AppDetails;
        setAppInfo(appInfo);
      }),
      getUserAchievements(appid).then((result) => {
        if (cancelled) return;
        const achievements = result.data.rgAchievements;
        setAchievements(achievements);
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

  return { achievementData, groups, appInfo, loading, error, achievements, sets };
}
