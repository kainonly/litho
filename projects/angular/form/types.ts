import { FormGroup } from '@angular/forms';

import { FormatDoc } from '@weplanx/ng';

export interface WpxFormInitOption {
  form: FormGroup;
  format: Record<string, FormatDoc>;
}
