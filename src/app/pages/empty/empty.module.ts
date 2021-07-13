import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyComponent } from './empty.component';
import { AppShareModule } from '@share';

const routes: Routes = [
  {
    path: '',
    component: EmptyComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [EmptyComponent]
})
export class EmptyModule {}
