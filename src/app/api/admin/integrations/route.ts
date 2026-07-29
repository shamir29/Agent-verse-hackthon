import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const integrations = await prisma.systemIntegration.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(integrations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch system integrations" }, { status: 500 });
  }
}
