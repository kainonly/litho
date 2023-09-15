import { Any } from '@weplanx/ng';

export interface Schedule {
  name: string;
  node: string;
}

export interface ScheduleState {
  status: boolean;
  jobs: ScheduleJob[];
}

export interface ScheduleJob {
  mode: string;
  spec: string;
  option: Any;
  schedule_state: { next: Date; prev: Date };
}
