import { useParams } from "next/navigation";
import {
  DashboardPage,
  dashboardRadarViewFromSlug,
  dashboardSectionFromSlug,
} from "./dashboard";

function DashboardSectionRoute() {
  const { section } = useParams<{ section: string }>();
  return (
    <DashboardPage
      initialSection={dashboardSectionFromSlug(section) ?? "Command Radar"}
      initialRadarView={dashboardRadarViewFromSlug(section)}
    />
  );
}

export default DashboardSectionRoute;
