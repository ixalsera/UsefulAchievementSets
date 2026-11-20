import { definePlugin, Field } from "millennium";

import { AchievementTabs } from "./AchievementTabs";
import { Icon } from "./components/Icon";

const SettingsContent = () => {
  return <Field label="Hello, World!" />;
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
