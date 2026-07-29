import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = (searchParams.get("q") || "").toLowerCase().trim();

    if (!q) return NextResponse.json([]);

    const [substations, reservoirs, alerts, solarArrays, wasteZones, evStations, users] = await Promise.all([
      prisma.substation.findMany({
        where: { OR: [{ name: { contains: q } }, { zone: { contains: q } }] },
        take: 4,
      }),
      prisma.reservoir.findMany({
        where: { name: { contains: q } },
        take: 4,
      }),
      prisma.alert.findMany({
        where: { OR: [{ title: { contains: q } }, { location: { contains: q } }] },
        take: 4,
      }),
      prisma.solarArray.findMany({
        where: { OR: [{ name: { contains: q } }, { zone: { contains: q } }] },
        take: 4,
      }),
      prisma.wasteZone.findMany({
        where: { zoneName: { contains: q } },
        take: 4,
      }),
      prisma.eVStation.findMany({
        where: { OR: [{ name: { contains: q } }, { location: { contains: q } }] },
        take: 4,
      }),
      prisma.userRecord.findMany({
        where: { OR: [{ name: { contains: q } }, { email: { contains: q } }] },
        take: 4,
      }),
    ]);

    const results = [
      ...substations.map((s) => ({ id: s.id, title: s.name, category: "Substation", href: "/infrastructure/smart-grid", meta: `${s.zone} • ${s.loadPercent}% Load` })),
      ...reservoirs.map((r) => ({ id: r.id, title: r.name, category: "Water Reservoir", href: "/urban-services/water", meta: `Level: ${r.levelPercent}%` })),
      ...alerts.map((a) => ({ id: a.id, title: a.title, category: "Alert Log", href: "/incidents/alerts", meta: `${a.severity.toUpperCase()} • ${a.location}` })),
      ...solarArrays.map((s) => ({ id: s.id, title: s.name, category: "Solar Array", href: "/infrastructure/solar", meta: `${s.generationKw} kW output` })),
      ...wasteZones.map((w) => ({ id: w.id, title: w.zoneName, category: "Waste Zone", href: "/urban-services/waste", meta: `Fill: ${w.fillLevelPercent}%` })),
      ...evStations.map((e) => ({ id: e.id, title: e.name, category: "EV Station", href: "/mobility/ev-charging", meta: `${e.chargersAvailable}/${e.totalChargers} Available` })),
      ...users.map((u) => ({ id: u.id, title: u.name, category: "User Record", href: "/admin/users", meta: `${u.role} (${u.department})` })),
    ];

    return NextResponse.json(results);
  } catch (error) {
    console.error("Global search failed:", error);
    return NextResponse.json({ error: "Failed to perform global search" }, { status: 500 });
  }
}
