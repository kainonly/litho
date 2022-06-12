import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { WpxCheckboxModule } from '@weplanx/ng/checkbox';
import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

import { ShareModule } from '../share.module';
import { DefaultComponent } from './default/default.component';
import { FormComponent } from './form/form.component';
import { SchemaComponent } from './schema.component';

@NgModule({
  imports: [ShareModule, DragDropModule, NzAutocompleteModule, NzCodeEditorModule, WpxCheckboxModule],
  declarations: [SchemaComponent, FormComponent, DefaultComponent]
})
export class SchemaModule {}
