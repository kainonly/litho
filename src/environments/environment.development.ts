import { Routes } from '@angular/router';

export const environment = {
  production: false,
  baseUrl: 'https://api-x.kainonly.com:8443',
  cdn: 'https://cdn.kainonly.com',
  extend: <Routes>[
    //   {
    //     path: 'experiment',
    //     loadChildren: () => import('../experiment/experiment.module').then(m => m.ExperimentModule),
    //     data: {
    //       breadcrumb: `Experiment`
    //     }
    //   }
  ]
};
