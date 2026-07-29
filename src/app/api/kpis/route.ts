import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [substations, reservoirs, alerts] = await Promise.all([
      prisma.substation.findMany(),
      prisma.reservoir.findMany(),
      prisma.alert.findMany(),
    ]);

    // Compute metrics dynamically
    const totalSubstations = substations.length;
    const avgLoad = totalSubstations > 0
      ? Math.round(substations.reduce((sum, s) => sum + s.loadPercent, 0) / totalSubstations)
      : 0;

    const criticalSubstations = substations.filter(s => s.status === "critical").length;
    const warningSubstations = substations.filter(s => s.status === "warning").length;
    const gridHealthPercent = Math.max(0, 100 - (criticalSubstations * 15 + warningSubstations * 5));

    const totalReservoirs = reservoirs.length;
    const avgWaterLevel = totalReservoirs > 0
      ? Math.round(reservoirs.reduce((sum, r) => sum + r.levelPercent, 0) / totalReservoirs)
      : 0;

    const activeCriticalAlerts = alerts.filter(a => a.severity === "critical" && a.status !== "resolved").length;
    const totalOpenAlerts = alerts.filter(a => a.status !== "resolved").length;

    // Overall city health calculation
    const cityHealthPercent = Math.round(
      (gridHealthPercent * 0.4) + (avgWaterLevel * 0.3) + (Math.max(0, 100 - activeCriticalAlerts * 20) * 0.3)
    );

    return NextResponse.json({
      cityHealth: cityHealthPercent,
      gridHealth: gridHealthPercent,
      avgGridLoad: avgLoad,
      waterReserveLevel: avgWaterLevel,
      activeCriticalAlerts,
      totalOpenAlerts,
      totalSubstations,
      totalReservoirs,
      airQualityAqi: 68, // Moderate healthy AQI
    });
  } catch (error) {
    console.error("Failed to compute KPIs:", error);
    return NextResponse.json({ error: "Failed to compute KPIs" }, { status: 500 });
  }
}
