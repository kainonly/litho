import { Component } from '@angular/core';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent {
  alerts: any[] = [
    { name: 'API服务', status: 'success', image: 'ccr.ccs.tencentyun.com/weplanx/api:v0.0.26', ready: 3, total: 3 },
    {
      name: '定时调度',
      status: 'success',
      image: 'ccr.ccs.tencentyun.com/weplanx/schedule:v1.1.2',
      ready: 2,
      total: 2
    },
    {
      name: '工作触发',
      status: 'success',
      image: 'ccr.ccs.tencentyun.com/weplanx/worker:v1.0.1',
      ready: 5,
      total: 5
    },
    {
      name: '日志采集',
      status: 'success',
      image: 'ccr.ccs.tencentyun.com/weplanx/collector:v1.2.1',
      ready: 2,
      total: 2
    },
    { name: '微服务 A', status: 'error', image: 'ccr.ccs.tencentyun.com/weplanx/svc1:v0.0.1', ready: 0, total: 3 },
    {
      name: '微服务 B',
      status: 'success',
      image: 'ccr.ccs.tencentyun.com/weplanx/svc2:v0.0.1',
      ready: 2,
      total: 3
    },
    {
      name: '微服务 C',
      status: 'success',
      image: 'ccr.ccs.tencentyun.com/weplanx/svc3:v0.0.1',
      ready: 3,
      total: 3
    }
  ];
}
