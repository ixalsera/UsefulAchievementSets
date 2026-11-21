import { IAchievementSet } from "../interfaces/Achievements";
import { Achievement } from "./Achievement";

interface AchievementSetProps {
  set: IAchievementSet;
}

export function AchievementSet({ set }: AchievementSetProps) {
  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        columnGap: "1rem",
        padding: "0 0.75rem",
      }}
    >
      <h1>{set.name}</h1>
      {set.achievements.map((achievement) => (
        <Achievement key={achievement.achievementId} achievement={achievement} />
      ))}
    </div>
  );
}
