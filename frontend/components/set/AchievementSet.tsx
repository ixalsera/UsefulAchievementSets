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
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <SetHeader achSet={set} collapsed={collapsed} onToggle={() => setCollapsed((c) => !c)} />
      <div className="achievementList" style={{ display: collapsed ? "none" : "" }}>
        {set.achievements.map((achievement) => (
          <Achievement key={achievement.achievementId} achievement={achievement} />
        ))}
      </div>
    </div>
  );
}
