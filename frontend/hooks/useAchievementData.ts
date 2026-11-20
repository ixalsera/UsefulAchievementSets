import { useEffect, useState } from "react";

import { AchievementDetails } from "../interfaces/Achievements";
import { AppDetails } from "../interfaces/Apps";
import { IGroup, IGroups } from "../interfaces/Groups";
import {
  getAchievementDetails,
  getAppInfo,
  getGroups,
  getUserAchievements,
} from "../util/dataFetcher";
import { AppAchievement } from "millennium";

// Note to self: These are like Vue composables; if you remember those!
export function useAchievementData(appid: number) {
  const [achievementData, setAchievementData] = useState<Array<AchievementDetails>>();
  const [groups, setGroups] = useState<Array<IGroup> | null>(null);
  const [appInfo, setAppInfo] = useState<AppDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [achievements, setAchievements] = useState<Array<AppAchievement>>();
  const [error, setError] = useState<string>();

  useEffect(() => {
    let cancelled = false; // ignore the result if the component unmounts first

    Promise.all([
      getAchievementDetails(appid)
        .then((result) => {
          if (!cancelled) {
            setAchievementData(result as unknown as AchievementDetails[]);
          }
        })
        .catch((e) => {
          if (!cancelled) {
            setError(String(e));
          }
        }),
      getGroups(appid)
        .then((result) => {
          if (!cancelled) {
            let res = result as unknown as IGroups
            setGroups(res.groups);
          }
        })
        .catch((e) => {
          if (!cancelled) {
            setError(String(e));
          }
        }),
      getAppInfo(appid)
        .then((result) => {
          if (!cancelled) {
            setAppInfo(result as unknown as AppDetails);
          }
        })
        .catch((e) => {
          if (!cancelled) {
            setError(String(e));
          }
        }),
      getUserAchievements(appid)
        .then((result) => {
          if (!cancelled) {
            setAchievements(result.data.rgAchievements)
          }
        })
    ]).then(() => {
      setLoading(false);
    });

    return () => {
      cancelled = true;
    };
  }, [appid]);

  return { achievementData, groups, appInfo, loading, error, achievements };
}
