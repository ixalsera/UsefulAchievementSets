import { ScrollPanel } from "millennium";

import { IAchievementSet } from "../interfaces/Achievements";
import { AchievementSet } from "./AchievementSet";

interface AchievementSetsProps {
  sets: IAchievementSet[];
}

export function AchievementSets({ sets }: AchievementSetsProps) {
  return (
    <ScrollPanel>
      {sets.map((set) => (
        <AchievementSet key={set.name} set={set} />
      ))}
    </ScrollPanel>
  );
}
