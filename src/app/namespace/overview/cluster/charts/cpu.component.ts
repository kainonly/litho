import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { Line } from '@antv/g2plot';

import { cpu } from './data';

@Component({
  selector: 'app-overview-cluster-cpu',
  template: `<div style="display: inline-block" [ngStyle]="{height,width}" #ref></div>`
})
export class CpuComponent implements AfterViewInit, OnDestroy {
  @Input() height?: string;
  @Input() width?: string;
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Line;

  ngAfterViewInit(): void {
    this.chart = new Line(this.ref.nativeElement, {
      autoFit: true,
      data: cpu,
      meta: {
        cpu: {
          max: 100,
          min: 0
        }
      },
      xField: 'time',
      yField: 'cpu'
    });

    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
