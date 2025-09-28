import { FormGroup } from '@angular/forms';

import { Any } from '@shared/models';

export interface FilterConfig {
  height: number;
  visible: boolean;
}

export class Filter {
  height: number;
  visible: boolean;

  constructor(
    public form: FormGroup,
    config?: FilterConfig
  ) {
    this.height = config ? config.height : 160;
    this.visible = config ? config.visible : false;
  }

  patch(value: Any): void {
    const notEmpty = Object.values(value).some(v => {
      if (v instanceof Array) {
        return v.length !== 0;
      }
      if (v instanceof Object) {
        return Object.keys(v).length !== 0;
      }
      if (v instanceof Date) {
        return new Date('1970-01-01T00:00:00Z').getTime() === v.getTime();
      }
      return !!v;
    });
    if (notEmpty) {
      this.visible = true;
    }
    this.form.patchValue(value);
  }

  reset(): void {
    this.form.reset();
  }

  open(): void {
    this.visible = !this.visible;
  }

  close(): void {
    this.visible = false;
  }
}
