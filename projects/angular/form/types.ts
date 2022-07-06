import { FormGroup } from '@angular/forms';

import { XDoc } from '@weplanx/ng';

export interface WpxFormInitOption {
  form: FormGroup;
  format: Record<string, XDoc>;
}
