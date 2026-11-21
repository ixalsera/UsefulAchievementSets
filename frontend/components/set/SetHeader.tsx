import { useEffect, useState } from "react";

import { AchievementSet } from "../../interfaces/Achievements";
import { SteamIcons } from "../../util/icons";

interface SetHeaderProps {
  achSet: AchievementSet;
  collapsed: boolean;
  onToggle: () => void;
}

export function SetHeader({ achSet, collapsed, onToggle }: SetHeaderProps) {
  const [capsuleImage, setCapsuleImage] = useState<string>();

  useEffect(() => {
    StoreItemCache.QueueAppRequest(achSet.appId, { include_assets: true }).then(() => {
      setCapsuleImage(StoreItemCache.GetApp(achSet.appId)?.GetAssets()?.GetSmallCapsuleURL());
    });
  }, [achSet]);

  return (
    <div style={{ display: "flex", flexDirection: "row", gap: "1rem" }}>
      <div style={{ width: "185px", height: "70px" }}>
        <img src={capsuleImage} width="100%" height="100%" alt={achSet.name} />
      </div>
      <div style={{ flexGrow: 1, justifyContent: "space-around" }}>
        <span style={{ fontWeight: "bold" }}>{achSet.name}</span>
        <div>{`${achSet.achieved}/${achSet.achievements.length} (${achSet.completionPercentage.toFixed(1)}%)`}</div>
      </div>
      <div>
        <SteamIcons.Chevron
          direction={collapsed ? "left" :"down"}
          width="2rem"
          height="2rem"
          style={{ cursor: "pointer" }}
          onClick={onToggle}
        />
      </div>
    </div>
  );
}
