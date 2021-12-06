import { Component, OnInit } from '@angular/core';

import { Collection, WpxService } from '@weplanx/components';

import { AppsSerivce } from './apps.serivce';

@Component({
  selector: 'app-admin-apps',
  templateUrl: './apps.component.html'
})
export class AppsComponent implements OnInit {
  coll!: Collection<any>;

  constructor(private wpx: WpxService, private apps: AppsSerivce) {}

  ngOnInit(): void {
    this.coll = this.wpx.collection('apps', [
      { label: '应用名称', key: 'name', type: 'text' },
      { label: '应用描述', key: 'description', type: 'text' },
      { label: '状态', key: 'status', type: 'bool' },
      { label: '创建日期', key: 'create_time', type: 'date' },
      { label: '修改时间', key: 'update_time', type: 'date' }
    ]);
    this.coll.ready.subscribe(() => {
      this.getData();
    });
  }

  getData(refresh = false): void {
    this.coll.from(this.apps.api, refresh).subscribe(v => {});
  }
}
