import { UntypedFormGroup } from '@angular/forms';

import { XData } from '@weplanx/ng';

export interface WpxFormInitOption {
  form: UntypedFormGroup;
  format: Record<string, XData>;
}
