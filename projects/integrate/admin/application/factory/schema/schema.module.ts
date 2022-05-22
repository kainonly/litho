import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { NzAutocompleteModule } from 'ng-zorro-antd/auto-complete';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { SchemaComponent } from './schema.component';

@NgModule({
  imports: [ShareModule, DragDropModule, NzAutocompleteModule],
  declarations: [SchemaComponent, FormComponent]
})
export class SchemaModule {}
