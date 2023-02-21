import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ControlComponent } from './control/control.component';
import { DiagramComponent } from './diagram/diagram.component';
import { OutlineComponent } from './outline/outline.component';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [PagesComponent, OutlineComponent, DiagramComponent, ControlComponent]
})
export class PagesModule {}
