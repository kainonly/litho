import { PortalModule } from '@angular/cdk/portal';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';
import { WpxBlockModule } from '@weplanx/block';

import { CardComponent } from './card.component';

const routes: Routes = [
  {
    path: '',
    component: CardComponent
  }
];

@NgModule({
  imports: [ShareModule, WpxBlockModule, RouterModule.forChild(routes)],
  declarations: [CardComponent]
})
export class CardModule {}
