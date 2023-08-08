import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ShareModule } from '@common/share.module';

import { AreaComponent } from './area.component';
import { LineComponent } from './line.component';
import { ObservabilityComponent } from './observability.component';
import { ObservabilityService } from './observability.service';
import { SumComponent } from './sum.component';

const routes: Routes = [
  {
    path: ':type',
    component: ObservabilityComponent,
    data: {
      breadcrumb: `应用观测`
    }
  },
  { path: '', redirectTo: 'apm', pathMatch: 'full' }
];

@NgModule({
  imports: [ShareModule, RouterModule.forChild(routes)],
  declarations: [ObservabilityComponent, AreaComponent, LineComponent, SumComponent],
  providers: [ObservabilityService]
})
export class ObservabilityModule {}
