import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const solarArrays = await prisma.solarArray.findMany({ orderBy: { name: "asc" } });
    return NextResponse.json(solarArrays);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch solar arrays" }, { status: 500 });
  }
}
