import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

import { ValidatorComponent } from './validator.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatorComponent
  }
];

@NgModule({
  imports: [AppShareModule, NzCodeEditorModule, RouterModule.forChild(routes)],
  declarations: [ValidatorComponent]
})
export class ValidatorModule {}
