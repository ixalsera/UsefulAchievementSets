import { Obtainability } from "../../interfaces/Achievements";

interface ObtainabilityChipProps {
  obtainability: Obtainability;
}

/**
 * Determines the label and color of the chip (using SH colors) as well as whether
 * to actually render the chip. I dunno, maybe people will want to see "Obtainable"
 * chips? :shrug:
 *
 * @param obtainability
 */
function formatChip(obtainability: Obtainability) {
  switch (obtainability) {
    case Obtainability.Obtainable:
      return { label: "Obtainable", color: "rgb(79 217 95)", display: false };
    case Obtainability.ConditionallyObtainable:
      return { label: "Conditional", color: "rgb(228, 128, 78)", display: true };
    case Obtainability.BrokenButObtainable:
      return { label: "Broken", color: "rgb(240, 173, 78)", display: true };
    case Obtainability.Unobtainable:
      return { label: "Unobtainable", color: "rgb(217, 83, 79)", display: true };
  }
}

export function ObtainabilityChip({ obtainability }: ObtainabilityChipProps) {
  const { label, color, display } = formatChip(obtainability);

  return (
    display && (
      <span
        style={{
          display: "inline-block",
          fontSize: "0.7rem",
          backgroundColor: color,
          padding: "0 5px",
          borderRadius: "9999px",
          color: "white",
        }}
      >
        {label}
      </span>
    )
  );
}
