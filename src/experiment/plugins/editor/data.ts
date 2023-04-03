export const data = `import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShareModule } from '@common/share.module';
import { EditorComponent } from './editor.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [EditorComponent]
})
export class EditorModule {}
`;
