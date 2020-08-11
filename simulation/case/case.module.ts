import { NgModule } from '@angular/core';
import { CaseComponent } from './case.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: CaseComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  declarations: [CaseComponent]
})
export class CaseModule {
}
