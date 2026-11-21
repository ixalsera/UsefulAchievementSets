import { useState } from "react";

import { AchievementSet } from "../../interfaces/Achievements";
import { Achievement } from "../achievement/Achievement";
import { SetHeader } from "./SetHeader";

interface AchievementSetProps {
  set: AchievementSet;
}

export function AchievementSet({ set }: AchievementSetProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div
      className="uasAchievementSet"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        background: "rgba(0,0,0,0.1)",
        padding: "0.5rem",
        borderRadius: "0.5rem",
      }}
    >
      <SetHeader achSet={set} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div
        className="uasAchievementList"
        style={{
          display: collapsed ? "none" : "flex",
          flexDirection: "column",
          gap: "0.5rem",
          transition: "transform 150ms ease",
        }}
      >
        {set.achievements.map((achievement) => (
          <Achievement key={achievement.achievementId} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
