import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hospitals = await prisma.hospitalNode.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(hospitals);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch hospital telemetry" }, { status: 500 });
  }
}
