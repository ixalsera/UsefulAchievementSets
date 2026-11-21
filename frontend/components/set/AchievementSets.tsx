import { AchievementSet as IAchievementSet } from "../../interfaces/Achievements";
import { AchievementSet } from "./AchievementSet";

interface AchievementSetsProps {
  sets: IAchievementSet[];
}

export function AchievementSets({ sets }: AchievementSetsProps) {
  return (
    <div
      className="uasAchievementSetList"
      style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
    >
      {sets.map((set) => (
        <AchievementSet key={set.name} set={set} />
      ))}
    </div>
  );
}
