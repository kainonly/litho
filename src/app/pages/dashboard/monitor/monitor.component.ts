import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-monitor',
  templateUrl: './monitor.component.html'
})
export class MonitorComponent {
  builder: any[] = [
    { name: '微服务 A', status: 'success', success: 16, total: 16 },
    { name: '微服务 B', status: 'processing', success: 0, total: 1 },
    { name: '微服务 C', status: 'success', success: 15, total: 15 },
    { name: 'Web应用（开发）', status: 'processing', success: 204, total: 205 },
    { name: 'Web应用（测试）', status: 'success', success: 99, total: 99 },
    { name: 'Web应用（生产）', status: 'success', success: 10, total: 10 },
    { name: '容器服务 A', status: 'error', success: 0, total: 15 },
    { name: '容器服务 B', status: 'warning', success: 45, total: 50 },
    { name: '容器服务 C', status: 'success', success: 7, total: 7 },
    { name: '容器服务 D', status: 'success', success: 10, total: 10 }
  ];
}
