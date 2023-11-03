import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { NzStepsModule } from 'ng-zorro-antd/steps';

import { BuildersComponent } from './builders.component';
import { FieldComponent } from './field/field.component';
import { FormComponent } from './form/form.component';
import { IndexComponent } from './index.component';
import { SchemaComponent } from './schema/schema.component';

const routes: Routes = [
  {
    path: '',
    component: BuildersComponent,
    children: [
      {
        path: 'index',
        component: IndexComponent
      },
      {
        path: ':id',
        component: SchemaComponent
      },
      { path: '', redirectTo: 'index', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, NzStepsModule, RouterModule.forChild(routes)],
  declarations: [BuildersComponent, FormComponent, IndexComponent, SchemaComponent, FieldComponent]
})
export class BuildersModule {}
