import { Component, Input, TemplateRef } from '@angular/core';

import { PagesSerivce } from '../pages.serivce';

@Component({
  selector: 'wpx-settings-pages-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent {
  @Input() extra?: TemplateRef<any>;

  constructor(public pages: PagesSerivce) {}
}
