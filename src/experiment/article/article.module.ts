import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RichtextModule } from '@common/components/richtext/richtext.module';
import { ShareModule } from '@common/share.module';

import { ArticleComponent } from './article.component';

const routes: Routes = [
  {
    path: '',
    component: ArticleComponent
  }
];

@NgModule({
  imports: [ShareModule, RichtextModule, RouterModule.forChild(routes)],
  declarations: [ArticleComponent]
})
export class ArticleModule {}
