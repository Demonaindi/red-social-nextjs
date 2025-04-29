"use client";

import { useState } from "react";
import SettingsSidebar from "@/app/components/settings/SettingsSidebar";
import SettingsContent from "@/app/components/settings/SettingsContent";


export default function SettingsPage() {
  const [selected, setSelected] = useState<string>("account");

  return (
    <div className="flex h-screen">
      <SettingsSidebar selected={selected} setSelected={setSelected} />
      <SettingsContent selected={selected} />
    </div>
  );
}
