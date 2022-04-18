import { Component, OnInit } from '@angular/core';

import { AuditService } from './audit.service';

@Component({
  selector: 'wpx-admin-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit {
  searchText: string = '';

  data: any[] = [];
  expands: Set<string> = new Set<string>();

  constructor(private audit: AuditService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    // TODO: 更换 Influx
    // this.audit.logs<LoginLog>('login_logs', {}).subscribe(v => {
    //   console.log(v);
    //   this.data = [...v];
    // });
  }

  onExpandChange(id: string, checked: boolean): void {
    if (checked) {
      this.expands.add(id);
    } else {
      this.expands.delete(id);
    }
  }
}
