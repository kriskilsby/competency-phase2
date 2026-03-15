import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { path: string[] } }
) {
  const backendUrl = `http://backend:3001/${params.path.join("/")}`;

  const res = await fetch(backendUrl);

  const data = await res.json();

  return Response.json(data);
}