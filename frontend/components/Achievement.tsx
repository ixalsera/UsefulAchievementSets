import { Achievement } from "../interfaces/Achievements";

interface AchievementProps {
  achievement: Achievement;
}

export function Achievement({ achievement }: AchievementProps) {
  return <div className="achievement">Cheev! {JSON.stringify(achievement)}</div>;
}
