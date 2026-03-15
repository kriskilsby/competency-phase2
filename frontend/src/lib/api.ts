// frontend/src/lib/api.ts
// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

const API_BASE =
  typeof window === "undefined"
    ? "http://backend:3001"     // server-side (inside Docker)
    : "http://localhost:3001";  // browser

console.log("API_BASE:", API_BASE);

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

export async function fetchEmployees() {
  const res = await fetch(`${API_BASE}/employees`);

  if (!res.ok) {
    throw new Error("Failed to fetch employees");
  }

  return res.json();
}

export async function fetchCompetencies() {
  const res = await fetch(`${API_BASE}/competencies`);

  if (!res.ok) {
    throw new Error("Failed to fetch competencies");
  }

  return res.json();
}

export async function fetchDashboard() {
  const res = await fetch(`${API_BASE}/dashboard/summary`);

  if (!res.ok) {
    throw new Error("Failed to fetch dashboard data");
  }

  return res.json();
}

export async function fetchSkillVolumes() {
  const res = await fetch(`${API_BASE}/dashboard/skill-volumes`);
  if (!res.ok) throw new Error('Failed to fetch skill volumes');
  return res.json();
}