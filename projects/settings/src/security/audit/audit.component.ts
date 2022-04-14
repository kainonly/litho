import { Component } from '@angular/core';

@Component({
  selector: 'wpx-settings-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent {
  searchText: string = '';
  data: any[] = [];

  getData(): void {}
}
