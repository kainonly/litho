import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { TabsModule } from '../tabs/tabs.module';
import { FormComponent } from './form/form.component';
import { SchemaComponent } from './schema.component';

const routes: Routes = [
  {
    path: '',
    component: SchemaComponent
  }
];

@NgModule({
  imports: [AppShareModule, DragDropModule, TabsModule, RouterModule.forChild(routes)],
  declarations: [SchemaComponent, FormComponent]
})
export class SchemaModule {}
