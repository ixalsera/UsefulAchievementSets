import { SteamIcons } from "../util/icons";

interface AchievementPointsProps {
  points: number;
}

export function AchievementPoints({ points }: AchievementPointsProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        paddingRight: "0.5rem",
        boxSizing: "border-box",
      }}
    >
      <span>{points}</span>
      <SteamIcons.Achievement width="1.2em" height="1.2em" style={{ flexShrink: 0 }} />
    </div>
  );
}
