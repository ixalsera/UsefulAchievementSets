import { AchievementSet } from "../../interfaces/Achievements";
import { Achievement } from "../achievement/Achievement";
import { SetHeader } from "./SetHeader";

interface AchievementSetProps {
  set: AchievementSet;
}

export function Set({ set }: AchievementSetProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <SetHeader set={set} />
      {set.achievements.map((achievement) => (
        <Achievement key={achievement.achievementId} achievement={achievement} />
      ))}
    </div>
  );
}
