import { FormGroup } from '@angular/forms';

import { FormatDoc } from '@weplanx/ng';

export interface WpxFormInit {
  form: FormGroup;
  format: Record<string, FormatDoc>;
}
