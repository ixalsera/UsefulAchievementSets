import { ErrorBoundary, SteamSpinner } from "millennium";
import { useEffect, useState } from "react";
import { AchievementDetails } from "../interfaces/Achievements";
import { Achievement } from "../components/Achievement";
import { IGroups } from "../interfaces/Groups";
import { AppDetails } from "../interfaces/Apps";

interface SteamHuntersViewProps {
  appid: number;
}

export function SteamHuntersView({ appid }: SteamHuntersViewProps) {
  const [data, setData] = useState<Array<AchievementDetails>|null>(null);
  const [groups, setGroups] = useState<IGroups|null>(null);
  const [appInfo, setAppInfo] = useState<AppDetails|null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    let cancelled = false; // ignore the result if the component unmounts first

    backend.getAchievements(appid)
      .then((result) => { if (!cancelled) setData(result); setLoading(false); })
      .catch((e) => { if (!cancelled) setError(String(e)); setLoading(false); });
    backend.getAchievementGroups(appid)
      .then((result) => { if (!cancelled) setGroups(result); setLoading(false); })
      .catch((e) => { if (!cancelled) setError(String(e)); setLoading(false); });
    backend.getAppInfo(appid)
      .then((result) => { if (!cancelled) setAppInfo(result); setLoading(false); })
      .catch((e) => { if (!cancelled) setError(String(e)); setLoading(false); });

    return () => { cancelled = true; };
  }, [appid]);

  return (
    <ErrorBoundary>
      { loading ? (
        <SteamSpinner background="transparent" />
      ) : error ? (
        <div data-appid={appid}>{error}</div>
      ) : (
        <>
        <div>{String(data)}</div>
        <div>{String(groups)}</div>
        <div>{String(appInfo)}</div>
        </>
      )}
    </ErrorBoundary>
  );
}
