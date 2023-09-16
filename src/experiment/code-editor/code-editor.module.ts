import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RichtextModule } from '@common/components/richtext/richtext.module';
import { ShareModule } from '@common/share.module';

import { CodeEditorComponent } from './code-editor.component';

const routes: Routes = [
  {
    path: '',
    component: CodeEditorComponent
  }
];

@NgModule({
  imports: [ShareModule, RichtextModule, RouterModule.forChild(routes)],
  declarations: [CodeEditorComponent]
})
export class CodeEditorModule {}
