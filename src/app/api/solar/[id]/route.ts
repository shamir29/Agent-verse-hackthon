import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { tiltAngleDeg, status } = body;

    const data: any = {};
    if (tiltAngleDeg !== undefined) data.tiltAngleDeg = tiltAngleDeg;
    if (status) data.status = status;

    const updated = await prisma.solarArray.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update solar array" }, { status: 500 });
  }
}
