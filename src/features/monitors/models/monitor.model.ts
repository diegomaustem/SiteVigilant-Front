// Dados base (comuns entre input e entidade)
export interface MonitorBase {
  userId: number;
  periodicityId: number;
  name: string;
  description?: string;
  url: string;
}

// Input para criação/atualização (não possui id, createdAt, updatedAt)
export type InputMonitor = MonitorBase;

// Entidade completa (retornada pela API)
export interface Monitor extends MonitorBase {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}

// Tipos para periodicidade (exemplo)
export type Periodicity = 1 | 2 | 3 | 4;

export const PeriodicityLabels: Record<Periodicity, string> = {
  1: 'Diário',
  2: 'Semanal',
  3: 'Mensal',
  4: 'Anual',
};