import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { WpxModule } from '@weplanx/common';
import { WpxLayoutModule } from '@weplanx/common/layout';
import { WpxShareModule } from '@weplanx/components';
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
  imports: [WpxModule, WpxLayoutModule, WpxShareModule, NzCodeEditorModule, RouterModule.forChild(routes), TabsModule],
  declarations: [ValidatorComponent]
})
export class ValidatorModule {}
