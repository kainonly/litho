import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { Subscription, timer } from 'rxjs';

import { Column } from '@antv/g2plot';

@Component({
  selector: 'wpx-admin-chart-load',
  template: `<div style="height: 300px" #ref></div>`
})
export class LoadComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Column;
  private timer!: Subscription;
  private data = [
    { type: 'API服务', value: 0.16 },
    { type: '定时调度', value: 0.125 },
    { type: '工作触发', value: 0.24 },
    { type: '日志采集', value: 0.19 },
    { type: '微服务 A', value: 0.22 },
    { type: '微服务 B', value: 0.05 },
    { type: '微服务 C', value: 0.01 }
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
    this.timer = timer(0, 5000).subscribe(() => {
      this.chart.changeData(this.data.map(v => ({ ...v, value: v.value * Math.random() })));
    });
  }

  ngOnDestroy(): void {
    this.timer.unsubscribe();
    this.chart.destroy();
  }
}
