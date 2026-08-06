export interface MonitorBase {
  userId: number;
  periodicityId: number;
  name: string;
  description?: string;
  url: string;
}

export type InputMonitor = MonitorBase;

export interface Monitor extends MonitorBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type MonitorApi ={
  id: number;
  user_id: number;    
  periodicity_id: number;
  name: string;
  description?: string;
  url: string;
  created_at: string;
  updated_at: string;
};
