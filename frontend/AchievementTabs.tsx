import { DialogButtonPrimary, DialogButtonSecondary, Focusable } from "millennium";
import { type ReactNode, useState } from "react";

import { SteamHuntersView } from "./views/SteamHuntersView";

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

export const AchievementTabs = ({ appid, overlayPinned, children }: AchievementTabsProps) => {
  const [tab, setTab] = useState<TabId>("valve");

  // Leave the in-game pinned overlay untouched.
  if (overlayPinned) return <>{children}</>;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
      <Focusable
        style={{ display: "flex", flexDirection: "row", gap: "16px", justifyContent: "center" }}
      >
        {TABS.map(({ id, title }) => {
          const Button = id === tab ? DialogButtonPrimary : DialogButtonSecondary;
          return (
            <Button
              key={id}
              style={{ width: "auto", minWidth: "160px" }}
              onClick={() => setTab(id)}
            >
              {title}
            </Button>
          );
        })}
      </Focusable>
      {tab === "valve" ? children : <SteamHuntersView appid={appid} />}
    </div>
  );
};
