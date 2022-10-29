import { Component } from '@angular/core';

@Component({
  selector: 'app-overview-cluster',
  templateUrl: './cluster.component.html'
})
export class ClusterComponent {
  state = [
    { label: 'CPU', value: 'cpu' },
    { label: '内存', value: 'mem' },
    { label: '网络', value: 'net' },
    { label: '文件系统', value: 'fs' }
  ];

  control = [
    { label: '环境配置', value: 'env' },
    { label: '发布版本', value: 'version' }
  ];
}
