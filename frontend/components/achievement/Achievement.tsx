import { useState } from "react";

import { Achievement } from "../../interfaces/Achievements";
import { ObtainabilityChip } from "../ui/ObtainabilityChip";
import { AchievementPercentage } from "./AchievementPercentage";
import { AchievementPoints } from "./AchievementPoints";

interface AchievementProps {
  achievement: Achievement;
}

export function Achievement({ achievement }: AchievementProps) {
  const [blurred, setBlurred] = useState(!achievement.rtUnlocked && achievement.bHidden);
  const unlockTime = new Date(achievement.rtUnlocked * 1000);

  function determineAchievementBackground() {
    const color = achievement.rtUnlocked ? "rgba(72, 144, 72, 0.2)" : "rgba(255, 255, 255, 0.1)";
    return `linear-gradient(to right, ${color} ${achievement.localPercentage}%, transparent ${achievement.localPercentage}%)`;
  }

  return (
    <div
      className="achievement"
      style={{
        position: "relative",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1rem",
        padding: "0 2rem",
      }}
      onClick={() => !achievement.rtUnlocked && achievement.bHidden && setBlurred((b) => !b)}
    >
      {blurred && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            inset: 0,
            zIndex: 1,
            cursor: "pointer",
          }}
        >
          <span style={{ fontWeight: "bold" }}>Spoiler Alert!</span>
          <span style={{ fontSize: "0.8rem" }}>Click to reveal this achievement</span>
        </div>
      )}
      <div
        className="achievementIcon"
        style={{
          height: "64px",
          width: "64px",
          display: "flex",
          flexShrink: 0,
          padding: "0px",
          filter: `blur(${blurred ? "10px" : "0"})`,
          transition: "filter 150ms ease",
        }}
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
          minHeight: "64px",
          boxSizing: "border-box",
          filter: `blur(${blurred ? "10px" : "0"})`,
          transition: "filter 150ms ease",
        }}
      >
        <div
          className="achievementCopy"
          style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}
        >
          <div
            style={{ display: "flex", flexDirection: "row", gap: "0.5rem", alignItems: "center" }}
          >
            <span style={{ fontWeight: "bold" }}>{achievement.name}</span>
            <ObtainabilityChip obtainability={achievement.obtainability} />
          </div>
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
              alignSelf: "end",
            }}
          >
            <AchievementPoints points={achievement.points} />
            <AchievementPercentage
              shPerc={achievement.localPercentage}
              steamPerc={achievement.steamPercentage}
            />
          </div>
          <div className="unlockTime" style={{ textAlign: "right" }}>
            {achievement.rtUnlocked ? unlockTime.toLocaleString() : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
