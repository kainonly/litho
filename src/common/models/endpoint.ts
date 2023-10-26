import { Any } from '@weplanx/ng';

export interface Endpoint {
  name: string;
  kind: 'schedule' | 'emqx';
  schedule?: EndpointSchedule;
}

export interface EndpointSchedule {
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
