export type Task = {
  id: number;
  title: string;
  description: string;
  isComplied: boolean;
  tags?: `${Tags}`[];
  priority?: number;
};

export enum Tags {
  HOT = 'hot',
  LOW = 'low',
  HIGH = 'high',
  MID = 'mid',
  DEV = 'dev',
  COMPLETED = 'completed',
  PENDING = 'pending',
}
