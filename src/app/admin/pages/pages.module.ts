import { DragDropModule } from '@angular/cdk/drag-drop';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';
import { NzTreeModule } from 'ng-zorro-antd/tree';
import { NzTreeSelectModule } from 'ng-zorro-antd/tree-select';

import { FieldComponent } from './field/field.component';
import { FormComponent } from './form/form.component';
import { IndexesComponent } from './indexes/indexes.component';
import { PagesComponent } from './pages.component';
import { PagesSerivce } from './pages.serivce';
import { RulesComponent } from './rules/rules.component';
import { SchemaComponent } from './schema/schema.component';
import { ValidatorComponent } from './validator/validator.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  }
];

@NgModule({
  imports: [
    AppShareModule,
    NzTreeModule,
    NzTreeSelectModule,
    DragDropModule,
    NzCodeEditorModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    PagesComponent,
    FormComponent,
    SchemaComponent,
    FieldComponent,
    IndexesComponent,
    RulesComponent,
    ValidatorComponent
  ],
  providers: [PagesSerivce]
})
export class PagesModule {}
