import { Routes } from '@angular/router';

import { environment } from '@env';

import { AppGuard } from '../app/app.guard';

export let experiments: Routes = [];

if (!environment.production) {
  experiments = [
    {
      path: 'experiment',
      loadChildren: () => import('../experiment/experiment.module').then(m => m.ExperimentModule),
      canActivate: [AppGuard],
      data: {
        breadcrumb: $localize`实验开发`
      }
    }
  ];
}
