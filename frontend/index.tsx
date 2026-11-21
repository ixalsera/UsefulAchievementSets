import { definePlugin, Field, IconsModule } from "millennium";

import { AchievementTabs } from "./AchievementTabs";

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
    icon: <IconsModule.Achievement />,
    content: <SettingsContent />,
  };
});
