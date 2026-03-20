// frontend/src/app/api/[...path]/route.ts
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;

  const backendUrl = `http://backend:3001/${path.join("/")}`;

  const res = await fetch(backendUrl);

  // ✅ Add this block immediately after fetch
  if (!res.ok) {
    const errorText = await res.text();
    return new Response(errorText, { status: res.status });
  }

  const data = await res.json();

  return Response.json(data);
}