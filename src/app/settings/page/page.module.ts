import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { PageComponent } from './page.component';
import { PageService } from './page.service';

const routes: Routes = [
  {
    path: '',
    component: PageComponent
  }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [PageComponent],
  providers: [PageService]
})
export class PageModule {}
