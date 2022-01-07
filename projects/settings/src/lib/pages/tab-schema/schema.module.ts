import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { ShareModule } from '../share.module';
import { FormComponent } from './form/form.component';
import { SchemaComponent } from './schema.component';

@NgModule({
  imports: [ShareModule, DragDropModule],
  declarations: [SchemaComponent, FormComponent]
})
export class SchemaModule {}
