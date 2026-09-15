import { CustomTabBar, TABS, TabButton } from "@/components/custom-tab-bar";
import { useAuth } from "@clerk/expo";
import { Redirect } from "expo-router";
import { TabList, TabSlot, TabTrigger, Tabs } from "expo-router/ui";

export const unstable_settings = {
  initialRouteName: "home",
};

export default function TabsLayout() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return null;
  }

  if (!isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return (
    <Tabs>
      <TabSlot />
      <TabList asChild>
        <CustomTabBar>
          {TABS.map((tab) => (
            <TabTrigger key={tab.name} name={tab.name} href={tab.href} asChild>
              <TabButton label={tab.label} icon={tab.icon} />
            </TabTrigger>
          ))}
        </CustomTabBar>
      </TabList>
    </Tabs>
  );
}
