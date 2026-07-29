import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const { status, assignedTeam } = body;

    const data: any = {};
    if (status) data.status = status;
    if (assignedTeam !== undefined) data.assignedTeam = assignedTeam;
    if (status === "resolved") {
      data.resolvedAt = new Date();
    }

    const updatedAlert = await prisma.alert.update({
      where: { id },
      data,
    });

    return NextResponse.json(updatedAlert);
  } catch (error) {
    console.error("Failed to update alert:", error);
    return NextResponse.json({ error: "Failed to update alert" }, { status: 500 });
  }
}
