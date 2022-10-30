import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxCheckboxModule } from '@weplanx/ng/checkbox';

import { DefaultComponent } from './default/default.component';
import { FormComponent } from './form/form.component';
import { SchemaComponent } from './schema.component';

const routes: Routes = [
  {
    path: '',
    component: SchemaComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxCheckboxModule, RouterModule.forChild(routes)],
  declarations: [SchemaComponent, FormComponent, DefaultComponent]
})
export class SchemaModule {}
