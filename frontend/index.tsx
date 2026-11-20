import { definePlugin, Field } from "millennium";
import { useEffect, useState } from "react";

import { AchievementTabs } from "./AchievementTabs";

const SettingsContent = () => {
  return <Field label="Hello, World!" />;
};

const Icon = () => {
  const [icon, setIcon] = useState<string>();

  useEffect(() => {
    console.log("Getting icon...");
    backend.getSteamBrewIconResource().then(setIcon);
  }, []);

  return (
    <div
      className="SteamClientHomebrewIcon"
      style={{
        width: "16px",
        height: "16px",
        marginRight: "5px",
      }}
      dangerouslySetInnerHTML={{ __html: icon }}
    />
  );
};

/** @ffi */
export const UASAchievementView = {
  Tabs: AchievementTabs,
};

async function initializePlugin() {
  console.log("Frontend initialized");
}

export default definePlugin(() => {
  initializePlugin();

  return {
    title: "Useful Achievement Sets",
    icon: <Icon />,
    content: <SettingsContent />,
  };
});
