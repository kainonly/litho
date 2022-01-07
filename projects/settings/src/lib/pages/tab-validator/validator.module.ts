import { NgModule } from '@angular/core';

import { NzCodeEditorModule } from 'ng-zorro-antd/code-editor';

import { ShareModule } from '../share.module';
import { ValidatorComponent } from './validator.component';

@NgModule({
  imports: [ShareModule, NzCodeEditorModule],
  declarations: [ValidatorComponent]
})
export class ValidatorModule {}
