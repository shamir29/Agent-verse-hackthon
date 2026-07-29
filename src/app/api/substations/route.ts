import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const zone = searchParams.get("zone");
    const status = searchParams.get("status");

    const where: any = {};
    if (zone && zone !== "all") {
      where.zone = zone;
    }
    if (status && status !== "all") {
      where.status = status;
    }

    const substations = await prisma.substation.findMany({
      where,
      orderBy: { name: "asc" },
    });

    return NextResponse.json(substations);
  } catch (error) {
    console.error("Failed to fetch substations:", error);
    return NextResponse.json({ error: "Failed to fetch substations" }, { status: 500 });
  }
}
