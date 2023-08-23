import { Any } from '@weplanx/ng';

export interface Workflow {
  project: string;
  name: string;
  kind: 'schedule';
  option: Any;
}
