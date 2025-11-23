import { auth } from "@/app/auth";

export async function GET() {
  return new Response("Auth API", { status: 200 });
}

export async function POST() {
  return new Response("Auth API", { status: 200 });
}
