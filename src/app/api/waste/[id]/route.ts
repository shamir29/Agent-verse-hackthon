import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { fillLevelPercent, status } = body;

    const data: any = {};
    if (fillLevelPercent !== undefined) data.fillLevelPercent = fillLevelPercent;
    if (status) data.status = status;
    data.lastCollected = new Date();

    const updated = await prisma.wasteZone.update({ where: { id }, data });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update waste zone" }, { status: 500 });
  }
}
