import { Achievement } from "../interfaces/Achievements";
import { AchievementPercentage } from "./AchievementPercentage";

interface AchievementProps {
  achievement: Achievement;
}

export function Achievement({ achievement }: AchievementProps) {
  function determineAchievementBackground() {
    const color = achievement.rtUnlocked ? "rgba(72, 144, 72, 0.2)" : "rgba(255, 255, 255, 0.1)";
    return `linear-gradient(to right, ${color} ${achievement.localPercentage}%, transparent ${achievement.localPercentage}%)`;
  }

  return (
    <div
      className="achievement"
      style={{
        display: "flex",
        flexDirection: "row",
        rowGap: "4rem",
        padding: "0 2rem",
      }}
    >
      <div className="achievementIcon">
        <img src={achievement.strImage} alt={achievement.name} />
      </div>
      <div
        className="achievementContent"
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          justifyContent: "space-between",
          padding: "1rem 0.75rem",
          background: determineAchievementBackground(),
        }}
      >
        <div
          className="achievementCopy"
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <span>{achievement.name}</span>
          <span style={{ fontSize: "0.8rem" }}>{achievement.description}</span>
        </div>
        <div className="achievementStats" style={{ fontSize: "0.8rem" }}>
          <div className="shStats">
            <span>{achievement.points}</span>
            <AchievementPercentage
              shPerc={achievement.localPercentage}
              steamPerc={achievement.steamPercentage}
            />
          </div>
          <div className="unlockTime">{achievement.rtUnlocked}</div>
        </div>
      </div>
    </div>
  );
}
