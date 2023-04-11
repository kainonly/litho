import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { ControlComponent } from './control/control.component';
import { DesignComponent } from './design.component';
import { DiagramComponent } from './diagram/diagram.component';
import { OutlineComponent } from './outline/outline.component';

const routes: Routes = [
  {
    path: '',
    component: DesignComponent
  }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [DesignComponent, OutlineComponent, DiagramComponent, ControlComponent]
})
export class DesignModule {}
