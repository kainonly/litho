import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';
import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

import { TabsModule } from '../tabs/tabs.module';
import { ValidatorComponent } from './validator.component';

const routes: Routes = [
  {
    path: '',
    component: ValidatorComponent
  }
];

@NgModule({
  imports: [AppShareModule, NzCodeEditorModule, RouterModule.forChild(routes), TabsModule],
  declarations: [ValidatorComponent]
})
export class ValidatorModule {}
