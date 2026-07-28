import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialAssets, mockMaintenanceTasks, mockFailurePredictions, mockAiRecommendations } from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [assets, setAssets] = useState(initialAssets);
  const [maintenanceTasks, setMaintenanceTasks] = useState(mockMaintenanceTasks);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedAssetModal, setSelectedAssetModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveStreaming, setIsLiveStreaming] = useState(true);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [diagnosticsTimeRange, setDiagnosticsTimeRange] = useState('Live');
  const [userRole, setUserRole] = useState('Lead Reliability Engineer');

  const [notifications, setNotifications] = useState([
    { id: 1, type: 'critical', title: 'HVAC Motor M-08 Temp Critical', message: 'Winding temperature reached 98.4°C', time: '2 mins ago', unread: true },
    { id: 2, type: 'critical', title: 'Water Pump P-11 Vibration Exceeded', message: 'Vibration reached 12.4 mm/s safety threshold', time: '14 mins ago', unread: true },
    { id: 3, type: 'warning', title: 'Transformer T-08 RUL Warning', message: 'Estimated RUL dropped to 9 days', time: '1 hour ago', unread: false },
    { id: 4, type: 'info', title: 'Solar Array Inverter 04 Telemetry', message: 'Intake dust alert logged by Solar Optimization Agent', time: '3 hours ago', unread: false },
  ]);

  // Live telemetry ticker simulation
  useEffect(() => {
    if (!isLiveStreaming) return;

    const interval = setInterval(() => {
      setAssets((prevAssets) =>
        prevAssets.map((asset) => {
          // Slight fluctuation in temp, vibration, voltage, current
          const tempDelta = (Math.random() - 0.48) * 0.4;
          const vibDelta = (Math.random() - 0.48) * 0.1;
          const powerDelta = (Math.random() - 0.5) * 5;

          const newTemp = Math.max(20, Math.min(110, +(asset.temperature + tempDelta).toFixed(1)));
          const newVib = Math.max(0.1, Math.min(20, +(asset.vibration + vibDelta).toFixed(1)));
          const newPower = Math.max(0, +(asset.powerConsumption + powerDelta).toFixed(0));

          return {
            ...asset,
            temperature: newTemp,
            vibration: newVib,
            powerConsumption: newPower,
          };
        })
      );
    }, 2500);

    return () => clearInterval(interval);
  }, [isLiveStreaming]);

  // Handle Maintenance Task Updates
  const markTaskCompleted = (taskId) => {
    setMaintenanceTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, status: 'Completed', expectedImprovement: 'Job Completed & Verified' } : t))
    );
  };

  const assignTechnician = (taskId, techName) => {
    setMaintenanceTasks((prev) =>
      prev.map((t) => (t.id === taskId ? { ...t, technicianAssigned: techName, status: t.status === 'Pending Assignment' ? 'Scheduled' : t.status } : t))
    );
  };

  const scheduleTask = (newTask) => {
    setMaintenanceTasks((prev) => [newTask, ...prev]);
  };

  const markNotificationRead = (notifId) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === notifId ? { ...n, unread: false } : n))
    );
  };

  const clearAllNotifications = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Filtered Assets based on Search
  const filteredAssets = assets.filter((asset) => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      asset.name.toLowerCase().includes(q) ||
      asset.id.toLowerCase().includes(q) ||
      asset.category.toLowerCase().includes(q) ||
      asset.agentSource.toLowerCase().includes(q) ||
      asset.status.toLowerCase().includes(q)
    );
  });

  return (
    <AppContext.Provider
      value={{
        assets,
        filteredAssets,
        maintenanceTasks,
        activeTab,
        setActiveTab,
        selectedAssetModal,
        setSelectedAssetModal,
        searchQuery,
        setSearchQuery,
        isLiveStreaming,
        setIsLiveStreaming,
        notificationsOpen,
        setNotificationsOpen,
        notifications,
        markNotificationRead,
        clearAllNotifications,
        diagnosticsTimeRange,
        setDiagnosticsTimeRange,
        userRole,
        setUserRole,
        markTaskCompleted,
        assignTechnician,
        scheduleTask,
        mockFailurePredictions,
        mockAiRecommendations,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
