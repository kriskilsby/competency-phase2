"use client";

import { useEffect, useState } from "react";
import { fetchEmployees } from "@/lib/api";
import { useRouter } from "next/navigation";

interface Employee {
  id: number;
  name: string;
  email: string;
}

export default function EmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchEmployees();
        console.log("Fetched employees:", data);
        setEmployees(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <div className="p-10">Loading...</div>;
  if (error) return <div className="p-10 text-red-500">{error}</div>;

  const filteredEmployees = employees.filter((emp) =>
    `${emp.firstName} ${emp.lastName} ${emp.job} ${emp.discipline}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="p-10 max-w-screen-2xl mx-auto">
      <h1 className="text-3xl text-zinc-200 font-bold mb-6">Employees</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-80 px-4 py-2 border rounded-lg 
          bg-white dark:bg-gray-800 
          border-gray-300 dark:border-gray-600
          text-gray-900 dark:text-gray-100"
        />
      </div>

      <div className="bg-white dark:bg-gray-600 shadow-lg rounded-lg overflow-x-auto border dark:border-gray-700 max-h-[660px] overflow-y-auto">
        <table className="min-w-full">
          <thead className="bg-gray-100 dark:bg-rose-800 text-left text-sm font-semibold text-gray-700 dark:text-gray-200 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-3">ID</th>
              <th className="px-6 py-3">Business Area</th>
              <th className="px-6 py-3">Dicipline</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Role</th>
              <th className="px-6 py-3">Employment History</th>
              <th className="px-6 py-3">Qualifications</th>
              <th className="px-6 py-3">Projects</th>
              <th className="px-6 py-3">CPD Entries</th>
            </tr>
          </thead>
          <tbody className="text-gray-400 dark:text-gray-200 text-sm">
            {filteredEmployees.map((emp) => (
              <tr key={emp.e_id}
                  onClick={() => router.push(`/employees/${emp.e_id}`)}
                  className="border-t border-gray-200 dark:border-gray-400 hover:bg-gray-50 dark:hover:bg-emerald-800 cursor-pointer">
                <td className="px-6 py-4 font-medium">{emp.e_id}</td>
                <td className="px-6 py-4">{emp.legalEntity}</td>
                <td className="px-6 py-4">{emp.discipline}</td>
                <td className="px-6 py-4">{emp.firstName} {emp.lastName}</td>
                <td className="px-6 py-4">{emp.job}</td>
                <td className="px-6 py-4">{emp.employmentHistoryCount}</td>
                <td className="px-6 py-4">{emp.qualificationsCount}</td>
                <td className="px-6 py-4">{emp.projectsCount}</td>
                <td className="px-6 py-4">{emp.cpdCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}