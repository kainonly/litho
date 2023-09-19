import { Routes } from '@angular/router';

export const environment = {
  production: false,
  baseUrl: 'https://xapi.kainonly.com:8443',
  cdn: 'https://cdn.kainonly.com',
  extend: <Routes>[
    {
      path: 'experiment',
      loadChildren: () => import('../experiment/experiment.module').then(m => m.ExperimentModule),
      data: {
        breadcrumb: `实验中心`
      }
    }
  ]
};
