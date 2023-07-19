import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { WpxModule, WpxShareModule } from '@weplanx/ng';
import { WpxTableModule } from '@weplanx/table';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

@NgModule({
  exports: [RouterModule, NzCodeEditorModule, WpxShareModule, WpxModule, WpxTableModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ShareModule {}
