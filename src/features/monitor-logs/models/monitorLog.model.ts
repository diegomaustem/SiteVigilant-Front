export interface LogBase {
  monitorId: number;
  url: string;
  isUp: boolean;
  statusCode: number | null;  
  responseTimeMs: number | null;
  errorMessage: string | null;
  checkedAt: Date;
}

export type InputLog = Omit<LogBase, 'checkedAt'> & {
  checkedAt?: Date;
};

export interface Log extends LogBase {
  id: number;
}

export interface MonitorLogApi {
  id: number;
  monitor_id: number;
  url: string;
  is_up: boolean;
  status_code: number | null;
  response_time_ms: number | null;
  error_message: string | null;
  checked_at: string;
}