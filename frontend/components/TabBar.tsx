import { DialogButtonPrimary, DialogButtonSecondary, Focusable } from "millennium";
import { type ReactNode, useState } from "react";

import { UsableAchievementSetsView } from "../views/UsableAchievementSetsView";

type TabId = "valve" | "uas";

const TABS: { id: TabId; title: string }[] = [
  { id: "valve", title: "Achievement Sets" },
  { id: "uas", title: "UAS" },
];

interface AchievementTabsProps {
  appid: number;
  overlayPinned?: boolean;
  /** Steam's original view: toolbar, pinned list and AchievementsTable. */
  children: ReactNode;
}

export const TabBar = ({ appid, overlayPinned, children }: AchievementTabsProps) => {
  const [tab, setTab] = useState<TabId>("valve");

  // Leave the in-game pinned overlay untouched.
  if (overlayPinned) return <>{children}</>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Focusable
        style={{ display: "flex", flexDirection: "row", gap: "0.25rem", justifyContent: "center" }}
      >
        {TABS.map(({ id, title }, idx) => {
          const border =
            idx === 0
              ? { borderTopLeftRadius: "1rem", borderBottomLeftRadius: "1rem" }
              : { borderTopRightRadius: "1rem", borderBottomRightRadius: "1rem" };
          const isActive = id === tab;
          const TabButton = isActive ? DialogButtonPrimary : DialogButtonSecondary;
          return (
            <TabButton
              key={id}
              style={{ width: "auto", minWidth: "160px", cursor: "pointer", ...border }}
              onClick={() => setTab(id)}
            >
              {title}
            </TabButton>
          );
        })}
      </Focusable>
      {tab === "valve" ? children : <UsableAchievementSetsView appid={appid} />}
    </div>
  );
};
