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
        path: 'projects',
        loadChildren: () => import('./projects/projects.module').then(m => m.ProjectsModule),
        data: {
          breadcrumb: '项目管理'
        }
      },
      {
        path: 'users',
        loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
        data: {
          breadcrumb: '成员管理'
        }
      },
      {
        path: 'security',
        loadChildren: () => import('./security/security.module').then(m => m.SecurityModule),
        data: {
          breadcrumb: '登录设置'
        }
      },
      {
        path: 'sessions',
        loadChildren: () => import('./sessions/sessions.module').then(m => m.SessionsModule),
        data: {
          breadcrumb: '会话管理'
        }
      },
      {
        path: 'audit',
        loadChildren: () => import('./audit/audit.module').then(m => m.AuditModule),
        data: {
          breadcrumb: '审计日志'
        }
      },
      {
        path: '',
        redirectTo: 'projects',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [ShareModule, HeaderModule, RouterModule.forChild(routes)],
  declarations: [AdminComponent]
})
export class AdminModule {}
