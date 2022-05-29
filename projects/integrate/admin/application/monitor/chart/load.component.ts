import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { Column } from '@antv/g2plot';

@Component({
  selector: 'wpx-admin-monitor-load',
  template: `<div style="height: 300px" #ref></div>`
})
export class LoadComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Column;
  private timer!: Subscription;
  private data = [
    { type: '核心服务', value: 0.16 },
    { type: '消息队列', value: 0.125 },
    { type: '即时通讯', value: 0.24 },
    { type: '云代理', value: 0.19 },
    { type: '定时计划', value: 0.22 },
    { type: '分布数据库', value: 0.05 },
    { type: '负载均衡', value: 0.01 },
    { type: '分布缓存', value: 0.015 }
  ];

  ngAfterViewInit(): void {
    this.chart = new Column(this.ref.nativeElement, {
      data: this.data,
      xField: 'type',
      yField: 'value',
      seriesField: 'value',
      color: ({ value }) => {
        if (value < 0.05) {
          return '#F4664A';
        }
        return '#5B8FF9';
      },
      legend: false
    });
    this.chart.render();
    this.timer = timer(0, 1200).subscribe(() => {
      this.chart.changeData(this.data.map(v => ({ ...v, value: v.value * Math.random() })));
    });
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe();
    this.chart.destroy();
  }
}
