import { FormGroup } from '@angular/forms';

import { XData } from '@weplanx/ng';

export interface WpxFormInitOption {
  form: FormGroup;
  format: Record<string, XData>;
}
