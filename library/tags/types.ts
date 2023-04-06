import { TemplateRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AnyDto, WpxApi } from '@weplanx/ng';

export interface Tag {
  name: string;
}

export interface FormData {
  api: WpxApi<Tag>;
  doc?: AnyDto<Tag>;
  form?: FormGroup;
  formTemplate?: TemplateRef<any>;
}
