import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'wpx-settings-pages-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent {
  @Input() key!: string;
  @Input() extra?: TemplateRef<any>;
}
