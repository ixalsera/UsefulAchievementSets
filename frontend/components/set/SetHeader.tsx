import { ProgressBar } from "millennium";
import { useEffect, useState } from "react";

import { useCollapse } from "../../context/CollapseContext";
import { AchievementSet } from "../../interfaces/Achievements";
import { GroupAchievementRibbon } from "../../util/extraSteam";
import { SteamIcons } from "../../util/icons";

interface SetHeaderProps {
  achSet: AchievementSet;
}

export function SetHeader({ achSet }: SetHeaderProps) {
  const { isCollapsed, toggle } = useCollapse();
  const collapsed = isCollapsed(achSet.name);
  const [capsuleImage, setCapsuleImage] = useState<string>();

  useEffect(() => {
    StoreItemCache.QueueAppRequest(achSet.appId, { include_assets: true }).then(() => {
      setCapsuleImage(StoreItemCache.GetApp(achSet.appId)?.GetAssets()?.GetSmallCapsuleURL());
    });
  }, [achSet]);

  return (
    <div
      className="uasAchievementSetHeader"
      style={{ display: "flex", flexDirection: "row", gap: "1rem" }}
    >
      <div className="uasAchievementSetBanner" style={{ width: "185px", height: "70px" }}>
        <img src={capsuleImage} width="100%" height="100%" alt={achSet.name} />
      </div>
      <div className="uasSetTrophy" style={{ alignContent: "center" }}>
        {GroupAchievementRibbon &&
          (achSet.completionPercentage >= 100 ? (
            <GroupAchievementRibbon isComplete isDlc={achSet.isDlc} shine />
          ) : (
            <GroupAchievementRibbon isDlc={achSet.isDlc} />
          ))}
      </div>
      <div
        className="uasAchievementSetHeaderContent"
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
          justifyContent: "space-around",
        }}
      >
        <span style={{ fontWeight: "bold" }}>{achSet.name}</span>
        <ProgressBar nProgress={achSet.completionPercentage} />
        <div
          style={{ fontSize: "0.8rem" }}
        >{`${achSet.achieved}/${achSet.achievements.length} (${achSet.completionPercentage.toFixed(1)}%)`}</div>
      </div>
      <div>
        <span
          className="uasAchievementSetChevron"
          style={{
            display: "inline-flex",
            cursor: "pointer",
            transition: "transform 150ms ease",
            transform: collapsed ? "rotate(90deg)" : undefined,
          }}
          onClick={() => toggle(achSet.name)}
        >
          <SteamIcons.Chevron width="2rem" height="2rem" />
        </span>
      </div>
    </div>
  );
}
