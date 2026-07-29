import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const wasteZones = await prisma.wasteZone.findMany({ orderBy: { zoneName: "asc" } });
    return NextResponse.json(wasteZones);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch waste zones" }, { status: 500 });
  }
}
