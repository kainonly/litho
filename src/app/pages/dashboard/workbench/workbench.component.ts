import { Component, OnInit } from '@angular/core';

import { AppService } from '@common/app.service';

@Component({
  selector: 'app-dashboard-workbench',
  templateUrl: './workbench.component.html'
})
export class WorkbenchComponent implements OnInit {
  lists: any[] = [{ name: '解决方案 A' }, { name: '解决方案 B' }, { name: '解决方案 C' }];

  constructor(private app: AppService) {}

  ngOnInit(): void {}
}
