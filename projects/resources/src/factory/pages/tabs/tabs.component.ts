import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'wpx-resources-factory-pages-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent {
  @Input() key!: string;
  @Input() extra?: TemplateRef<any>;
}
