import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';

import { TabsModule } from '../tabs/tabs.module';
import { FormComponent } from './form/form.component';
import { SchemaComponent } from './schema.component';

@NgModule({
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, DragDropModule, TabsModule],
  declarations: [SchemaComponent, FormComponent]
})
export class SchemaModule {}
