import { AchievementSet } from "../../interfaces/Achievements";

interface SetHeaderProps {
  set: AchievementSet;
}

export function SetHeader({ set }: SetHeaderProps) {
  return <span>{set.name}</span>;
}
