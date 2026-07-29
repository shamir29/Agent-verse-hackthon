import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  TelemetryData,
  PanelData,
  FaultAlert,
  BatterySchedule,
  MaintenanceTask,
  ForecastHour,
  NotificationItem,
  AIInsight,
  FinancialMetric,
  EnvironmentalMetric,
  TelemetryConfig,
} from '../types/solar';
import {
  initialTelemetry,
  initialPanels,
  initialFaultAlerts,
  initialBatterySchedule,
  initialMaintenanceTasks,
  initialForecast,
  initialNotifications,
  initialAIInsights,
  initialFinancialMetrics,
  initialEnvironmentalMetrics,
  initialTelemetryConfig,
} from '../mock/solarData';

interface SolarContextType {
  telemetry: TelemetryData;
  panels: PanelData[];
  faultAlerts: FaultAlert[];
  batterySchedule: BatterySchedule[];
  maintenanceTasks: MaintenanceTask[];
  forecast: ForecastHour[];
  notifications: NotificationItem[];
  aiInsights: AIInsight[];
  financialMetrics: FinancialMetric;
  environmentalMetrics: EnvironmentalMetric;
  telemetryConfig: TelemetryConfig;

  // Navigation & Modal States
  activeSection: string;
  setActiveSection: (section: string) => void;
  selectedPanel: PanelData | null;
  setSelectedPanel: (panel: PanelData | null) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  heatmapMode: 'STATUS' | 'POWER' | 'DIRT' | 'TEMP' | 'SHADING';
  setHeatmapMode: (mode: 'STATUS' | 'POWER' | 'DIRT' | 'TEMP' | 'SHADING') => void;

  // Actions
  toggleSimulation: () => void;
  updateTelemetryConfig: (newConfig: Partial<TelemetryConfig>) => void;
  acknowledgeAlert: (alertId: string) => void;
  resolveAlert: (alertId: string) => void;
  cleanPanelArray: (stringId?: string) => void;
  updateTaskStatus: (taskId: string, status: MaintenanceTask['status']) => void;
  updateBatteryMode: (timeSlot: string, mode: BatterySchedule['mode']) => void;
  markNotificationRead: (notifId: string) => void;
  clearNotifications: () => void;
  askAiAssistant: (userPrompt: string) => void;
  runDeepDiagnostics: (panelId: string) => void;
}

const SolarContext = createContext<SolarContextType | undefined>(undefined);

export const SolarProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [telemetry, setTelemetry] = useState<TelemetryData>(initialTelemetry);
  const [panels, setPanels] = useState<PanelData[]>(initialPanels);
  const [faultAlerts, setFaultAlerts] = useState<FaultAlert[]>(initialFaultAlerts);
  const [batterySchedule, setBatterySchedule] = useState<BatterySchedule[]>(initialBatterySchedule);
  const [maintenanceTasks, setMaintenanceTasks] = useState<MaintenanceTask[]>(initialMaintenanceTasks);
  const [forecast] = useState<ForecastHour[]>(initialForecast);
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications);
  const [aiInsights, setAiInsights] = useState<AIInsight[]>(initialAIInsights);
  const [financialMetrics] = useState<FinancialMetric>(initialFinancialMetrics);
  const [environmentalMetrics] = useState<EnvironmentalMetric>(initialEnvironmentalMetrics);
  const [telemetryConfig, setTelemetryConfig] = useState<TelemetryConfig>(initialTelemetryConfig);

  const [activeSection, setActiveSection] = useState<string>('dashboard');
  const [selectedPanel, setSelectedPanel] = useState<PanelData | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [heatmapMode, setHeatmapMode] = useState<'STATUS' | 'POWER' | 'DIRT' | 'TEMP' | 'SHADING'>('STATUS');

  // Real-time live simulation ticker
  useEffect(() => {
    if (!telemetryConfig.simulationMode) return;

    const interval = setInterval(() => {
      setTelemetry((prev) => {
        const cloudFactor = telemetryConfig.cloudCoverSimulation ? 0.65 : 1.0;
        const jitter = (Math.random() - 0.48) * 4;
        const newPowerKw = Math.max(
          120,
          Math.min(520, parseFloat((485 + jitter * cloudFactor).toFixed(1)))
        );

        const newIrradiance = Math.max(
          200,
          Math.min(1050, Math.round(945 + (Math.random() - 0.5) * 15 * cloudFactor))
        );

        const newPanelTemp = parseFloat((41.0 + (Math.random() - 0.5) * 0.8).toFixed(1));
        const newTodayKwh = Math.round(prev.todayEnergyKwh + newPowerKw / 3600);

        return {
          ...prev,
          currentPowerKw: newPowerKw,
          solarIrradianceWm2: newIrradiance,
          panelTempC: newPanelTemp,
          todayEnergyKwh: newTodayKwh,
          gridExportKw: parseFloat((newPowerKw * 0.64).toFixed(1)),
          costSavingsUsd: parseFloat((prev.costSavingsUsd + 0.05).toFixed(2)),
          timestamp: new Date().toLocaleTimeString(),
        };
      });

      setPanels((prevPanels) =>
        prevPanels.map((p) => {
          if (p.status === 'FAULT') return p;
          const powerJitter = Math.floor((Math.random() - 0.5) * 6);
          const newW = Math.max(100, Math.min(410, p.powerOutputW + powerJitter));
          return {
            ...p,
            powerOutputW: newW,
            voltageV: parseFloat((38.5 + (newW / 400) * 4).toFixed(1)),
            currentA: parseFloat((newW / (38.5 + (newW / 400) * 4)).toFixed(2)),
          };
        })
      );
    }, telemetryConfig.sensorFrequencySeconds * 1000);

    return () => clearInterval(interval);
  }, [telemetryConfig]);

  const toggleSimulation = () => {
    setTelemetryConfig((prev) => ({
      ...prev,
      simulationMode: !prev.simulationMode,
    }));
  };

  const updateTelemetryConfig = (newConfig: Partial<TelemetryConfig>) => {
    setTelemetryConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const acknowledgeAlert = (alertId: string) => {
    setFaultAlerts((prev) =>
      prev.map((a) => (a.id === alertId ? { ...a, acknowledged: true } : a))
    );
  };

  const resolveAlert = (alertId: string) => {
    setFaultAlerts((prev) => prev.filter((a) => a.id !== alertId));
  };

  const cleanPanelArray = (stringId?: string) => {
    setPanels((prev) =>
      prev.map((p) => {
        if (!stringId || p.stringId === stringId) {
          return {
            ...p,
            dirtLevelPct: 2,
            healthScorePct: p.status === 'FAULT' ? p.healthScorePct : 98,
            powerOutputW: p.status === 'FAULT' ? p.powerOutputW : 405,
            status: p.status === 'FAULT' ? 'FAULT' : 'HEALTHY',
            faultDescription: p.status === 'FAULT' ? p.faultDescription : undefined,
          };
        }
        return p;
      })
    );

    setMaintenanceTasks((prev) =>
      prev.map((t) => (t.id === 'MNT-201' ? { ...t, status: 'COMPLETED' } : t))
    );

    setNotifications((prev) => [
      {
        id: `NOT-${Date.now()}`,
        title: 'Panel Cleaning Completed',
        message: `${stringId || 'All Panel Arrays'} washed successfully. Output boosted by +4.8%.`,
        type: 'INFO',
        timestamp: 'Just now',
        read: false,
      },
      ...prev,
    ]);
  };

  const updateTaskStatus = (taskId: string, status: MaintenanceTask['status']) => {
    setMaintenanceTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status } : t))
    );
  };

  const updateBatteryMode = (timeSlot: string, mode: BatterySchedule['mode']) => {
    setBatterySchedule((prev) =>
      prev.map((b) => (b.timeSlot === timeSlot ? { ...b, mode } : b))
    );
  };

  const markNotificationRead = (notifId: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, read: true } : n))
    );
  };

  const clearNotifications = () => {
    setNotifications([]);
  };

  const askAiAssistant = (userPrompt: string) => {
    const promptLower = userPrompt.toLowerCase();
    let responseText = `AI Optimizer evaluated your query: "${userPrompt}". All solar strings are currently operating within 96.8% nominal limits.`;

    if (promptLower.includes('panel b2-1') || promptLower.includes('hotspot') || promptLower.includes('fault')) {
      responseText = `Panel B2-1 has a detected Hotspot Thermal Failure (58.4°C). Recommending replacement of bypass diode (MNT-202). Resolving this will restore ~2.5% system efficiency and prevent $14.80 daily revenue loss.`;
    } else if (promptLower.includes('clean') || promptLower.includes('dirt') || promptLower.includes('soiling')) {
      responseText = `Array C shows 34% dirt accumulation. Automated cleaning is recommended today at 15:00 PM. Est. yield improvement: +4.8%.`;
    } else if (promptLower.includes('battery') || promptLower.includes('charge') || promptLower.includes('export')) {
      responseText = `Battery storage is currently at 84% (45.0 kW charge rate). Recommended action: Export 60.0 kW to utility grid during peak tariff ($0.35/kWh) from 16:00 to 19:00 PM to maximize earnings.`;
    } else if (promptLower.includes('savings') || promptLower.includes('revenue') || promptLower.includes('cost')) {
      responseText = `Today's net solar cost savings stand at $426.50. Monthly projected savings: $12,840. System ROI is tracking at 18.6% per annum.`;
    }

    setAiInsights((prev) => [
      {
        id: `INS-${Date.now()}`,
        category: 'PERFORMANCE',
        content: responseText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        confidenceScorePct: 99,
      },
      ...prev,
    ]);
  };

  const runDeepDiagnostics = (panelId: string) => {
    setPanels((prev) =>
      prev.map((p) => {
        if (p.id === panelId) {
          const isFaulty = p.status === 'FAULT';
          return {
            ...p,
            healthScorePct: isFaulty ? 72 : 99,
            faultDescription: isFaulty
              ? 'Deep Scan: Thermal hotspot confirmed on bypass cell #3. Diode replacement required.'
              : 'Deep Scan: IV-Curve optimal. Zero degradation detected.',
          };
        }
        return p;
      })
    );

    if (selectedPanel && selectedPanel.id === panelId) {
      setSelectedPanel((prev) =>
        prev
          ? {
              ...prev,
              healthScorePct: prev.status === 'FAULT' ? 72 : 99,
              faultDescription:
                prev.status === 'FAULT'
                  ? 'Deep Scan: Thermal hotspot confirmed on bypass cell #3. Diode replacement required.'
                  : 'Deep Scan: IV-Curve optimal. Zero degradation detected.',
            }
          : null
      );
    }
  };

  return (
    <SolarContext.Provider
      value={{
        telemetry,
        panels,
        faultAlerts,
        batterySchedule,
        maintenanceTasks,
        forecast,
        notifications,
        aiInsights,
        financialMetrics,
        environmentalMetrics,
        telemetryConfig,
        activeSection,
        setActiveSection,
        selectedPanel,
        setSelectedPanel,
        isSearchOpen,
        setIsSearchOpen,
        heatmapMode,
        setHeatmapMode,
        toggleSimulation,
        updateTelemetryConfig,
        acknowledgeAlert,
        resolveAlert,
        cleanPanelArray,
        updateTaskStatus,
        updateBatteryMode,
        markNotificationRead,
        clearNotifications,
        askAiAssistant,
        runDeepDiagnostics,
      }}
    >
      {children}
    </SolarContext.Provider>
  );
};

export const useSolar = () => {
  const context = useContext(SolarContext);
  if (!context) {
    throw new Error('useSolar must be used within a SolarProvider');
  }
  return context;
};
