import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { WpxCommonModule, WpxModule } from '@weplanx/components';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzTreeModule } from 'ng-zorro-antd/tree';

import { WpxPageComponent } from './wpx-page/wpx-page.component';
import { WpxPageSerivce } from './wpx-page/wpx-page.serivce';
import { WpxSchemaActComponent } from './wpx-schema/wpx-schema-act/wpx-schema-act.component';
import { WpxSchemaFieldActComponent } from './wpx-schema/wpx-schema-field-act/wpx-schema-field-act.component';
import { WpxSchemaComponent } from './wpx-schema/wpx-schema.component';
import { WpxSchemaService } from './wpx-schema/wpx-schema.service';

@NgModule({
  imports: [WpxModule, WpxCommonModule, NzTreeModule, DragDropModule, NzCodeEditorModule],
  declarations: [WpxSchemaComponent, WpxSchemaActComponent, WpxSchemaFieldActComponent, WpxPageComponent],
  exports: [WpxSchemaComponent, WpxSchemaActComponent, WpxSchemaFieldActComponent, WpxPageComponent],
  providers: [WpxSchemaService, WpxPageSerivce]
})
export class WpxSettingsModule {}
