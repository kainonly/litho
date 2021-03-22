import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageComponent } from './page.component';
import { AppExtModule } from '@ext';

const routes: Routes = [
  {
    path: '',
    component: PageComponent
  }
];

@NgModule({
  imports: [AppExtModule, RouterModule.forChild(routes)],
  declarations: [PageComponent]
})
export class PageModule {
}
