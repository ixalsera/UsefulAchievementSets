interface SwitchProps {
  value: boolean;
  onToggle: () => void;
}

/**
 * A good-enough clone of the new SteamUI switch component as used in the new
 * Achievements view.
 */
export function Switch({ value, onToggle }: SwitchProps) {
  return (
    <div
      role="switch"
      style={{
        position: "relative",
        borderRadius: "9000px",
        boxSizing: "border-box",
        width: "2.5rem",
        height: "1.5rem",
        cursor: "pointer",
      }}
      aria-checked={value}
      onClick={onToggle}
    >
      <div
        className="switchTrack"
        style={{
          position: "absolute",
          borderRadius: "9000px",
          overflow: "hidden",
          width: "2.5rem",
          height: "1.5rem",
          background: value ? "var(--color-blue-9)" : "var(--color-dull-8)",
        }}
      ></div>
      <div
        className="switchHandle"
        style={{
          borderRadius: "9000px",
          height: "1.5rem",
          width: "1.5rem",
          transform: value ? "translateX(calc(2.5rem - 1.5rem))" : "translateX(0)",
          transition: "transform 0.2s cubic-bezier( .1, .12, .53, 1.72 )",
          background: "#fff",
        }}
      ></div>
    </div>
  );
}
