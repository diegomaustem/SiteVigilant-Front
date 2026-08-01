export interface PeriodicityBase {
  time: string;
  status: boolean;
}

export type InputPeriodicity = PeriodicityBase;

export interface Periodicity extends PeriodicityBase {
  id: number;
  createdAt: string;
  updatedAt: string;
}

export type PeriodicityApi = Omit<Periodicity, 'createdAt' | 'updatedAt'> & {
  created_at: string;
  updated_at: string;
};