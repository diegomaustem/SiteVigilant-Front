import type { Log, MonitorLogApi } from '../models/monitorLog.model';

export const mapMonitorLogApiToLog = (apiLog: MonitorLogApi): Log => ({
  id: apiLog.id,
  monitorId: apiLog.monitor_id,
  url: apiLog.url,
  isUp: apiLog.is_up,
  statusCode: apiLog.status_code,
  responseTimeMs: apiLog.response_time_ms,
  errorMessage: apiLog.error_message,
  checkedAt: new Date(apiLog.checked_at),
});

export const mapMonitorLogsApiToLogs = (apiLogs: MonitorLogApi[]): Log[] =>
  apiLogs.map(mapMonitorLogApiToLog);