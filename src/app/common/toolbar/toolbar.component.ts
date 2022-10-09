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
      name: '项目',
      icon: 'project',
      routerLink: ['/apps']
    },
    {
      name: '媒体',
      icon: 'inbox',
      routerLink: ['/media']
    },
    {
      name: '组织',
      icon: 'apartment',
      routerLink: ['/orgs']
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
