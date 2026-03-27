// frontend/src/app/page.tsx
export const dynamic = "force-dynamic";

import { fetchDashboard } from "@/lib/api";
import DashboardTile from "@/components/DashboardTile";
import SkillCirclePacking from '@/components/SkillCirclePacking';

export default async function Home() {
  const data = await fetchDashboard();

  // SAFE fallback
  if (!data) {
    return (
      <div className="p-6 text-zinc-400">
        Loading dashboard...
      </div>
    );
  }

  // REAL render (data is guaranteed)
  return (
    <div>
      <h1 className="text-secondary font-medium mb-4 text-2xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-4xl pl-32 p-2">
        Building Design Dashboard
      </h1>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">

        <DashboardTile
          title="Employees"
          total={data.employees.total}
          approved={data.employees.approved}
          totalLabel="Total Employees"
          approvedLabel="Fully Approved"
          link="/employees"
        />

        <DashboardTile
          title="Employment History"
          total={data.employmentHistory.total}
          approved={data.employmentHistory.approved}
          totalLabel="Employees with History"
          approvedLabel="History Approved"
          link="/employment-history"
        />

        <DashboardTile
          title="Qualifications"
          total={data.qualifications.total}
          approved={data.qualifications.approved}
          totalLabel="Employees with Qualifications"
          approvedLabel="Qualifications Approved"
          link="/qualifications"
        />

        <DashboardTile
          title="Project Experience"
          total={data.projectExperience.total}
          approved={data.projectExperience.approved}
          totalLabel="Employees with Projects"
          approvedLabel="Projects Approved"
          link="/projects"
        />

        <DashboardTile
          title="CPD"
          total={data.cpd.total}
          approved={data.cpd.approved}
          totalLabel="Employees with CPD"
          approvedLabel="CPD Approved"
          link="/cpd"
        />

      </div>

      <div className="max-w-7xl mx-auto px-0 sm:px-1 md:px-4 lg:px-6 pb-10 min-w-0 overflow-x-hidden">
        <SkillCirclePacking />
      </div>
    </div>
  );
}