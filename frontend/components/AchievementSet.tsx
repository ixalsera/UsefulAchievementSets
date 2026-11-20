import { IAchievementSet } from "../interfaces/Achievements";
import { Achievement } from "./Achievement";

interface AchievementSetProps {
  set: IAchievementSet;
}

export function AchievementSet({ set }: AchievementSetProps) {
  return (
    <>
      {set.achievements.map((achievement) => (
        <Achievement achievement={achievement} />
      ))}
    </>
  );
}
