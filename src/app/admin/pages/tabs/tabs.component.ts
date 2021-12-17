import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-admin-pages-tabs',
  templateUrl: './tabs.component.html'
})
export class TabsComponent {
  @Input() key!: string;
}
