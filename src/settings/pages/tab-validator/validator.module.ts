import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
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
  imports: [ShareModule, NzCodeEditorModule, RouterModule.forChild(routes), TabsModule],
  declarations: [ValidatorComponent]
})
export class ValidatorModule {}
