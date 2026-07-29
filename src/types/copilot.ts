export interface CopilotIntent {
  title: string;
  category: string;
  confidence: number; // e.g. 99.4
  description: string;
}

export interface CopilotModule {
  id: string;
  name: string;
  status: "active" | "ingesting" | "synced";
  iconName?: string;
}

export interface CopilotLiveDataSource {
  id: string;
  name: string;
  type: "SCADA" | "IoT" | "GIS" | "Database" | "Satellite";
  status: "live" | "nominal" | "streaming" | "synced";
  lastSync: string;
  recordCount?: number;
}

export interface CopilotStructuredMetric {
  label: string;
  value: string | number;
  unit?: string;
  change?: string;
  status?: "critical" | "warning" | "nominal" | "good";
}

export interface CopilotChartPoint {
  time: string;
  [key: string]: string | number;
}

export interface CopilotGISMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: "leak" | "substation" | "reservoir" | "aqi_sensor" | "ev_station" | "emergency" | "flood_zone";
  severity?: "critical" | "warning" | "nominal";
  detail?: string;
  value?: string;
  radiusKm?: number;
  zone?: string;
}

export interface CopilotGISPolyline {
  id: string;
  name: string;
  points: [number, number][]; // [lat, lng]
  color: string;
  dashed?: boolean;
  type: "pipeline" | "power_feeder" | "traffic_route";
}

export interface CopilotAIRecommendation {
  id: string;
  title: string;
  reasoning: string;
  impact: string;
  crossModuleInsight: string;
}

export type ActionType =
  | "view_map"
  | "assign_team"
  | "create_work_order"
  | "notify_ops"
  | "isolate_valve"
  | "reroute_load";

export interface CopilotAction {
  id: string;
  label: string;
  type: ActionType;
  primary?: boolean;
  payload?: Record<string, any>;
}

export interface CopilotResponse {
  id: string;
  userQuery: string;
  timestamp: string;
  latencyMs: number;
  intent: CopilotIntent;
  modules: CopilotModule[];
  liveSources: CopilotLiveDataSource[];
  metrics: CopilotStructuredMetric[];
  table: {
    title?: string;
    headers: string[];
    rows: Record<string, any>[];
  };
  chart?: {
    title: string;
    type: "bar" | "area" | "line";
    dataKey: string;
    data: CopilotChartPoint[];
    unit?: string;
  };
  timeline?: {
    time: string;
    event: string;
    status: "completed" | "in_progress" | "pending";
    module: string;
  }[];
  gisMap?: {
    overlayTitle: string;
    center: [number, number]; // [lat, lng]
    zoom: number;
    markers: CopilotGISMarker[];
    polylines?: CopilotGISPolyline[];
  };
  recommendations: CopilotAIRecommendation[];
  actions: CopilotAction[];
}
