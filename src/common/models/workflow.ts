import { Any } from '@weplanx/ng';

export interface Workflow {
  project: string;
  name: string;
  kind: 'schedule';
  schedule?: WorkflowSchedule;
}

export interface WorkflowSchedule {
  schedule_id: string;
  status: boolean;
  jobs: WorkflowScheduleJob[];
}

export interface WorkflowScheduleJob {
  mode: string;
  spec: string;
  option: Any;
}
