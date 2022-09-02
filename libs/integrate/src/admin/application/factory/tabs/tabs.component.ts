import { Component, Input, TemplateRef } from '@angular/core';

@Component({
  selector: 'wpx-admin-factory-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent {
  /**
   * 页面 ID
   */
  @Input() id!: string;
  /**
   * 操作模板
   */
  @Input() extra?: TemplateRef<any>;
}
