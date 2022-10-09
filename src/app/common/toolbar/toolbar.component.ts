import { Component } from '@angular/core';

import { Menu } from '@common/toolbar/types';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {
  menus: Menu[] = [
    {
      name: '应用',
      icon: 'appstore',
      routerLink: ['/apps']
    },
    {
      name: '媒体',
      icon: 'inbox',
      routerLink: ['/media']
    },
    {
      name: '权限组',
      icon: 'partition',
      routerLink: ['/roles']
    },
    {
      name: '团队成员',
      icon: 'team',
      routerLink: ['/users']
    },
    {
      name: '会话',
      icon: 'rocket',
      routerLink: ['/sessions']
    },
    {
      name: '审计',
      icon: 'file-protect',
      routerLink: ['/audit']
    }
  ];
}
