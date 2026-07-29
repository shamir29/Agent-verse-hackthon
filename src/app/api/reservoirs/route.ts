import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const reservoirs = await prisma.reservoir.findMany({
      orderBy: { name: "asc" },
    });
    return NextResponse.json(reservoirs);
  } catch (error) {
    console.error("Failed to fetch reservoirs:", error);
    return NextResponse.json({ error: "Failed to fetch reservoirs" }, { status: 500 });
  }
}
