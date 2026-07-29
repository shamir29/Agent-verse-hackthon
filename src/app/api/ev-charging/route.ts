import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const stations = await prisma.eVStation.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(stations);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch EV stations" }, { status: 500 });
  }
}
