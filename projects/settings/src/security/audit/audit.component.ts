import { Component, OnInit } from '@angular/core';

import { AuditService } from './audit.service';
import { LoginLog } from './types';

@Component({
  selector: 'wpx-settings-audit',
  templateUrl: './audit.component.html'
})
export class AuditComponent implements OnInit {
  searchText: string = '';
  data: any[] = [];

  constructor(private audit: AuditService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.audit.logs<LoginLog>('login_logs', {}).subscribe(v => {
      this.data = [...v];
    });
  }
}
