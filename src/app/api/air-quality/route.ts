import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const sensors = await prisma.airQualitySensor.findMany({ orderBy: { location: "asc" } });
    return NextResponse.json(sensors);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch air quality sensors" }, { status: 500 });
  }
}
