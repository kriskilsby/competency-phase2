// frontend/src/lib/api.ts
// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

// const API_BASE = process.env.NEXT_PUBLIC_API_URL!;

const API_BASE =
  typeof window === "undefined"
    ? "http://backend:3001"     // server-side (Docker to Docker)
    : "http://localhost:3001";  // browser → host

// const API_BASE = process.env.NEXT_PUBLIC_API_URL;

if (!API_BASE) {
  throw new Error("NEXT_PUBLIC_API_URL is not defined");
}

console.log("API_BASE:", API_BASE);

// if (!API_BASE) {
//   throw new Error("NEXT_PUBLIC_API_URL is not defined");
// }

// fetch helper function with error handling
async function safeFetch(url: string) {
  try {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Request failed: ${url}`);
    }

    return await res.json();
  } catch (err) {
    console.log("API not ready:", url);
    return null; // prevents crash
  }
}

// All fetches replaced with safeFetch function enabled with API_BASE
export async function fetchEmployees() {
  return safeFetch(`${API_BASE}/employees`);
}

export async function fetchCompetencies() {
  return safeFetch(`${API_BASE}/competencies`);
}

export async function fetchDashboard() {
  return safeFetch(`${API_BASE}/dashboard/summary`);
}

export async function fetchSkillVolumes() {
  return safeFetch(`${API_BASE}/dashboard/skill-volumes`);
}