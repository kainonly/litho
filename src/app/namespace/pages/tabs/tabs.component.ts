import { Component, Input, TemplateRef } from '@angular/core';

import { AppService } from '@app';

import { PagesService } from '../pages.service';

@Component({
  selector: 'app-pages-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent {
  @Input() id!: string;
  @Input() extra?: TemplateRef<any>;

  constructor(public app: AppService, public pages: PagesService) {}
}
