import { Any } from '@weplanx/ng';

export interface Workflow {
  name: string;
  kind: 'schedule';
  option: Any;
}
