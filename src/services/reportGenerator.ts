import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { MainTelemetry, PipelineRoute, LeakAlert, ReservoirData, WaterQualitySector } from '../types/waterSystem';

export class ReportGenerator {
  /**
   * Export PDF Executive Summary Report
   */
  public static generatePdfReport(
    reportType: string,
    telemetry: MainTelemetry,
    pipelines: PipelineRoute[],
    leaks: LeakAlert[],
    reservoirs: ReservoirData[],
    qualitySectors: WaterQualitySector[]
  ) {
    const doc = new jsPDF();
    const timestamp = new Date().toLocaleString();

    // Futuristic Blue Header
    doc.setFillColor(11, 18, 38); // Dark space #0b1226
    doc.rect(0, 0, 210, 38, 'F');

    doc.setTextColor(0, 210, 255); // Neon Cyan
    doc.setFontSize(20);
    doc.setFont('helvetica', 'bold');
    doc.text('AQUAMIND AI - WATER MANAGEMENT REPORT', 14, 18);

    doc.setTextColor(200, 220, 255);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text(`Type: ${reportType.toUpperCase()} REPORT  |  Generated: ${timestamp}`, 14, 28);

    // Summary Telemetry Grid Box
    doc.setFillColor(240, 248, 255);
    doc.rect(14, 45, 182, 38, 'F');
    doc.setDrawColor(0, 210, 255);
    doc.rect(14, 45, 182, 38, 'S');

    doc.setTextColor(15, 23, 42);
    doc.setFontSize(11);
    doc.setFont('helvetica', 'bold');
    doc.text('EXECUTIVE TELEMETRY SUMMARY', 20, 54);

    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(`Total Water Available: ${telemetry.totalWaterAvailableMGL} MGL`, 20, 63);
    doc.text(`Daily Consumption: ${telemetry.dailyConsumptionMGL} MGL/day`, 20, 71);
    doc.text(`Reservoir Fill Level: ${telemetry.reservoirCapacityPct}%`, 20, 79);

    doc.text(`Active Leak Alerts: ${telemetry.activeLeaksCount}`, 110, 63);
    doc.text(`Flood Risk Level: ${telemetry.floodRiskLevel} (${telemetry.floodRiskPct}%)`, 110, 71);
    doc.text(`Water Quality Index: ${telemetry.waterQualityIndex} / 100`, 110, 79);

    // Table 1: Active Pipe Leak Diagnostics
    doc.setTextColor(0, 50, 100);
    doc.setFontSize(12);
    doc.setFont('helvetica', 'bold');
    doc.text('1. Active Leak & Pipe Anomaly Diagnostics', 14, 95);

    const leakRows = leaks.map((l) => [
      l.id,
      l.pipeName,
      l.locationName,
      l.severity,
      `${l.pressureDropPsi} PSI`,
      `${l.estimatedLossLh.toLocaleString()} L/h`,
      l.repairPriority,
      l.status,
    ]);

    autoTable(doc, {
      startY: 100,
      head: [['ID', 'Pipe Name', 'Location', 'Severity', 'Drop', 'Loss (L/h)', 'Priority', 'Status']],
      body: leakRows,
      theme: 'grid',
      headStyles: { fillColor: [0, 168, 204], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8 },
    });

    // Table 2: Reservoir Capacities
    const finalY1 = (doc as any).lastAutoTable.finalY || 150;

    doc.text('2. Reservoir & Dam Capacity Metrics', 14, finalY1 + 12);

    const resRows = reservoirs.map((r) => [
      r.id,
      r.name,
      `${r.currentCapacityMGL} / ${r.maxCapacityMGL} MGL`,
      `${r.fillPercentage}%`,
      `${r.dailyInflowMGL} MGL`,
      `${r.dailyOutflowMGL} MGL`,
      `${r.healthScore}/100`,
      r.status,
    ]);

    autoTable(doc, {
      startY: finalY1 + 16,
      head: [['ID', 'Reservoir Name', 'Capacity', 'Fill %', 'Inflow', 'Outflow', 'Health', 'Status']],
      body: resRows,
      theme: 'grid',
      headStyles: { fillColor: [15, 76, 129], textColor: [255, 255, 255], fontStyle: 'bold' },
      styles: { fontSize: 8 },
    });

    // Save File
    const fileName = `AquaMind_Report_${reportType.toLowerCase()}_${Date.now()}.pdf`;
    doc.save(fileName);
  }

  /**
   * Export Excel Spreadsheet (.xlsx)
   */
  public static generateExcelReport(
    reportType: string,
    telemetry: MainTelemetry,
    pipelines: PipelineRoute[],
    leaks: LeakAlert[],
    reservoirs: ReservoirData[],
    qualitySectors: WaterQualitySector[]
  ) {
    const wb = XLSX.utils.book_new();

    // Sheet 1: Telemetry Overview
    const overviewData = [
      { Metric: 'Report Type', Value: reportType },
      { Metric: 'Timestamp', Value: new Date().toLocaleString() },
      { Metric: 'Total Water Available (MGL)', Value: telemetry.totalWaterAvailableMGL },
      { Metric: 'Daily Water Consumption (MGL)', Value: telemetry.dailyConsumptionMGL },
      { Metric: 'Reservoir Capacity (%)', Value: telemetry.reservoirCapacityPct },
      { Metric: 'Active Leak Count', Value: telemetry.activeLeaksCount },
      { Metric: 'Flood Risk (%)', Value: telemetry.floodRiskPct },
      { Metric: 'Flood Risk Level', Value: telemetry.floodRiskLevel },
      { Metric: 'Water Quality Index (0-100)', Value: telemetry.waterQualityIndex },
      { Metric: 'Smart Irrigation Saved (Liters)', Value: telemetry.smartIrrigationSavedLiters },
      { Metric: 'Rainwater Harvested (Liters)', Value: telemetry.rainwaterHarvestedLiters },
    ];
    const overviewSheet = XLSX.utils.json_to_sheet(overviewData);
    XLSX.utils.book_append_sheet(wb, overviewSheet, 'System Overview');

    // Sheet 2: Leak Diagnostics
    const leakData = leaks.map((l) => ({
      ID: l.id,
      Pipe: l.pipeName,
      Sector: l.sector,
      Location: l.locationName,
      Severity: l.severity,
      PressureDrop_PSI: l.pressureDropPsi,
      Loss_LitersPerHour: l.estimatedLossLh,
      Priority: l.repairPriority,
      Status: l.status,
      ProbabilityPct: l.leakProbabilityPct,
    }));
    const leakSheet = XLSX.utils.json_to_sheet(leakData);
    XLSX.utils.book_append_sheet(wb, leakSheet, 'Leak Alerts');

    // Sheet 3: Reservoirs
    const resData = reservoirs.map((r) => ({
      ID: r.id,
      Name: r.name,
      CurrentLevel_M: r.currentLevelM,
      MaxCapacity_MGL: r.maxCapacityMGL,
      CurrentCapacity_MGL: r.currentCapacityMGL,
      FillPercentage: r.fillPercentage,
      Inflow_MGL: r.dailyInflowMGL,
      Outflow_MGL: r.dailyOutflowMGL,
      HealthScore: r.healthScore,
      Status: r.status,
    }));
    const resSheet = XLSX.utils.json_to_sheet(resData);
    XLSX.utils.book_append_sheet(wb, resSheet, 'Reservoirs');

    // Sheet 4: Water Quality
    const qualData = qualitySectors.map((q) => ({
      ID: q.id,
      Sector: q.sectorName,
      Location: q.location,
      pH: q.pH,
      TDS_ppm: q.tdsPpm,
      Turbidity_NTU: q.turbidityNtu,
      Temp_C: q.temperatureC,
      DO_mgL: q.dissolvedOxygenMgL,
      ContaminationPct: q.contaminationPct,
      Score: q.qualityScore,
    }));
    const qualSheet = XLSX.utils.json_to_sheet(qualData);
    XLSX.utils.book_append_sheet(wb, qualSheet, 'Water Quality');

    // Export Workbook
    const fileName = `AquaMind_DataExport_${reportType.toLowerCase()}_${Date.now()}.xlsx`;
    XLSX.writeFile(wb, fileName);
  }
}
