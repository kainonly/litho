import {FormGroup} from '@angular/forms';

export interface BitExplainArgs {
  form: FormGroup;
  name: string;
  explain: any;
  async?: boolean;
}
