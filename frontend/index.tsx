import { definePlugin, Field } from "millennium";

import { TabBar } from "./components/TabBar";
import { SteamIcons } from "./util/icons";

const SettingsContent = () => {
  return <Field label="Hello, World!" />;
};

/** @ffi */
export const UASAchievementView = {
  Tabs: TabBar,
};

async function initializePlugin() {
  console.log("Frontend initialized");
}

export default definePlugin(() => {
  initializePlugin();

  return {
    title: "Useful Achievement Sets",
    icon: <SteamIcons.Achievement />,
    content: <SettingsContent />,
  };
});
