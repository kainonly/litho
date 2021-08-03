import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppShareModule } from '@share';

import { ApplicationComponent } from './applications/application.component';
import { ArticlesComponent } from './articles/articles.component';
import { ProjectsComponent } from './projects/projects.component';

const routes: Routes = [
  {
    path: 'articles',
    component: ArticlesComponent
  },
  {
    path: 'projects',
    component: ProjectsComponent
  },
  {
    path: 'applications',
    component: ApplicationComponent
  },
  { path: '', redirectTo: '/list/search/articles', pathMatch: 'full' }
];

@NgModule({
  imports: [AppShareModule, RouterModule.forChild(routes)],
  declarations: [ApplicationComponent, ArticlesComponent, ProjectsComponent]
})
export class SearchModule {}
