import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeaderModule } from '@common/header/header.module';
import { ShareModule } from '@common/share.module';

import { AdminComponent } from './admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'center',
        children: [
          {
            path: 'projects',
            loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
            data: {
              breadcrumb: '项目管理'
            }
          },
          {
            path: 'functions',
            loadChildren: () => import('./functions/functions.module').then(m => m.FunctionsModule),
            data: {
              breadcrumb: '功能模块'
            }
          },
          {
            path: 'security',
            loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
            data: {
              breadcrumb: '安全策略'
            }
          },
          { path: '', redirectTo: 'projects', pathMatch: 'full' }
        ],
        data: {
          breadcrumb: '应用中心'
        }
      },
      {
        path: 'roles',
        loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule),
        data: {
          breadcrumb: '权限组'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: '团队成员'
        }
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: {
          breadcrumb: '在线会话'
        }
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
        data: {
          breadcrumb: '审计日志'
        }
      },
      { path: '', redirectTo: 'center', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [ShareModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
