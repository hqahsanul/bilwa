"use client";

import { useParams } from "next/navigation";
import {
  DashboardPage,
  dashboardRadarViewFromSlug,
  dashboardSectionFromSlug,
} from "@/routes/dashboard";

export default function DashboardSectionRoute() {
  const { section } = useParams<{ section: string }>();
  return (
    <DashboardPage
      initialSection={dashboardSectionFromSlug(section) ?? "Command Radar"}
      initialRadarView={dashboardRadarViewFromSlug(section)}
    />
  );
}
