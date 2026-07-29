import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const users = await prisma.userRecord.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, role, department } = body;

    if (!name || !email || !role || !department) {
      return NextResponse.json({ error: "Missing required user fields" }, { status: 400 });
    }

    const newUser = await prisma.userRecord.create({
      data: {
        name,
        email,
        role,
        department,
        status: "active",
      },
    });

    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create user record" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("id");
    const clearAll = searchParams.get("clearAll");

    if (clearAll === "true") {
      await prisma.userRecord.deleteMany();
      return NextResponse.json({ message: "All user records cleared successfully" });
    }

    if (userId) {
      await prisma.userRecord.delete({ where: { id: userId } });
      return NextResponse.json({ message: "User deleted successfully" });
    }

    return NextResponse.json({ error: "Missing delete criteria" }, { status: 400 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete user" }, { status: 500 });
  }
}
