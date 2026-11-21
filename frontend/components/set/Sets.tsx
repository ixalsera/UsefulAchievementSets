import { ScrollPanel } from "millennium";

import { AchievementSet } from "../../interfaces/Achievements";
import { Set } from "./Set";

interface AchievementSetsProps {
  sets: AchievementSet[];
}

export function Sets({ sets }: AchievementSetsProps) {
  return (
    <ScrollPanel>
      {sets.map((set) => (
        <Set key={set.name} set={set} />
      ))}
    </ScrollPanel>
  );
}
