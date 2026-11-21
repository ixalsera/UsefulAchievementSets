import { Achievement } from "../../interfaces/Achievements";
import { AchievementPercentage } from "./AchievementPercentage";
import { AchievementPoints } from "./AchievementPoints";

interface AchievementProps {
  achievement: Achievement;
}

export function Achievement({ achievement }: AchievementProps) {
  function determineAchievementBackground() {
    const color = achievement.rtUnlocked ? "rgba(72, 144, 72, 0.2)" : "rgba(255, 255, 255, 0.1)";
    return `linear-gradient(to right, ${color} ${achievement.localPercentage}%, transparent ${achievement.localPercentage}%)`;
  }

  function shouldBlur() {
    if (achievement.rtUnlocked) {
      return false;
    }
    return achievement.bHidden;
  }

  const unlockTime = new Date(achievement.rtUnlocked * 1000);

  return (
    <div
      className="achievement"
      style={{
        display: "flex",
        flexDirection: "row",
        gap: "1rem",
        padding: "0 2rem",
        filter: `blur(${shouldBlur() ? "10px" : "0"})`,
      }}
    >
      <div
        className="achievementIcon"
        style={{ height: "64px", width: "64px", display: "flex", padding: "0" }}
      >
        <img
          src={achievement.strImage}
          alt={achievement.name}
          style={{ width: "100%", height: "100%" }}
        />
      </div>
      <div
        className="achievementContent"
        style={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          justifyContent: "space-between",
          padding: "0.3rem 0.5rem",
          background: determineAchievementBackground(),
          height: "64px",
          boxSizing: "border-box",
        }}
      >
        <div
          className="achievementCopy"
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <span>{achievement.name}</span>
          <span style={{ fontSize: "0.8rem" }}>{achievement.description}</span>
        </div>
        <div
          className="achievementStats"
          style={{
            fontSize: "0.8rem",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div
            className="shStats"
            style={{
              display: "flex",
              flexDirection: "row",
            }}
          >
            <AchievementPoints points={achievement.points} />
            <AchievementPercentage
              shPerc={achievement.localPercentage}
              steamPerc={achievement.steamPercentage}
            />
          </div>
          <div className="unlockTime" style={{ textAlign: "right" }}>
            {achievement.rtUnlocked ? unlockTime.toLocaleDateString() : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
