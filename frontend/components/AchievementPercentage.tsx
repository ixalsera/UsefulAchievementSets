interface AchievementPercentageProps {
  shPerc: number;
  steamPerc: number;
}

export function AchievementPercentage({ shPerc, steamPerc }: AchievementPercentageProps) {
  function determineColor() {
    if (shPerc < 5) return "rgb(255, 160, 64)";
    if (shPerc < 10) return "rgb(208, 64, 255)";
    if (shPerc < 20) return "rgb(64, 208, 255)";
    if (shPerc < 50) return "rgb(64, 255, 64)";
    return;
  }

  return (
    <span
      style={{
        color: determineColor(),
        width: "3rem",
        textAlign: "right",
      }}
    >
      {shPerc.toFixed(1)}%
    </span>
  );
}
