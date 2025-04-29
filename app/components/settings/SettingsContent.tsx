"use client";

import AccountSettings from "../sections/AccountSettings";
import PasswordSettings from "@/app/components/sections/PaswwordSettings";
import NotificationsSettings from "@/app/components/sections/NotificationSettings";

export default function SettingsContent({ selected }: { selected: string }) {
  return (
    <main className="flex-1 p-6 overflow-y-auto">
      {selected === "account" && <AccountSettings />}
      {selected === "password" && <PasswordSettings />}
      {selected === "notifications" && <NotificationsSettings />}
    </main>
  );
}
