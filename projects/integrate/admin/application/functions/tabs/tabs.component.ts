import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'wpx-admin-functions-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent {
  @Input() extra?: TemplateRef<any>;
}
