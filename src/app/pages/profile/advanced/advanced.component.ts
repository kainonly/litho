import { Component, OnInit } from '@angular/core';

import { BitService } from 'ngx-bit';

@Component({
  selector: 'app-profile-advanced',
  templateUrl: './advanced.component.html',
  styleUrls: ['./advanced.component.scss']
})
export class AdvancedComponent {
  logsType = 0;
  logs1: any[] = [
    { type: '订购关系生效', user: '曲丽丽', result: 1, date: '2017-10-03 19:23:12', remark: '-' },
    { type: '财务复审', user: '付小小', result: 0, date: '2017-10-03 19:23:12', remark: '不通过原因' },
    { type: '部门初审', user: '周毛毛', result: 1, date: '2017-10-03 19:23:12', remark: '-' },
    { type: '提交订单', user: '林东东', result: 1, date: '2017-10-03 19:23:12', remark: '很棒' },
    { type: '创建订单', user: '汗牙牙', result: 1, date: '2017-10-03 19:23:12', remark: '-' }
  ];
  logs2: any[] = [{ type: '订购关系生效', user: '曲丽丽', result: 1, date: '2017-10-03 19:23:12', remark: '-' }];
  logs3: any[] = [{ type: '创建订单', user: '汗牙牙', result: 1, date: '2017-10-03 19:23:12', remark: '-' }];

  constructor(public bit: BitService) {}
}
