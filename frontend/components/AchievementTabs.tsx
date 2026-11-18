import { DialogButtonPrimary, DialogButtonSecondary, Focusable } from "millennium";
import { type ReactNode, useState } from "react";
import { SteamHuntersView } from "./SteamHuntersView";

// NOTE: millennium's `Tabs` is a port of Decky's gamepad Tabs. It waits for
// `window.DeckyPluginLoader.routerHook.routes`, which never exists in the desktop
// client, so it renders a SteamSpinner forever. We use a simple button tab bar instead.

type TabId = "valve" | "uas";

const TABS: { id: TabId; title: string }[] = [
  { id: "valve", title: "Achievement Sets" },
  { id: "uas", title: "SteamHunters" },
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
      <Focusable style={{ display: "flex", flexDirection: "row", gap: "8px" }}>
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
      {tab === "valve" ? children : SteamHuntersView({ appid })}
    </div>
  );
};
