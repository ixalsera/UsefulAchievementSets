import { findModuleExport } from "millennium";
import type { FC } from "react";

interface GroupAchievementRibbonProps {
  isComplete?: boolean;
  isDlc?: boolean;
  variant?: "flat" | "inset" | "floating";
  size?: string;
  shine?: boolean;
  theme?: "dark" | "light";
}

export const GroupAchievementRibbon: FC<GroupAchievementRibbonProps> | undefined = findModuleExport(
  (e) => typeof e === "function" && e.toString().includes("GroupAchievementRibbon"),
);
