export const routes = [
  {
    path: '',
    loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
  },
  {
    path: 'admin-index',
    loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
  },
  {
    path: 'admin-add',
    loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
  },
  {
    path: 'admin-edit/:id',
    loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
  },
  {
    path: 'admin-edit/:id/:subId',
    loadChildren: () => import('../simulation/case/case.module').then(m => m.CaseModule)
  }
];
