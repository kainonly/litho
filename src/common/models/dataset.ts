import { Any } from '@weplanx/ng';

export interface Dataset {
  name: string;
  type: string;
  keys: string[];
  status: boolean;
  event: boolean;
  options: Any;
}
