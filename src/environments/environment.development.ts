import { Routes } from '@angular/router';

export const environment = {
  production: false,
  baseUrl: '/api',
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
