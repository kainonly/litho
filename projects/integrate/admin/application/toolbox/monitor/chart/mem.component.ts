import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild } from '@angular/core';

import { Liquid } from '@antv/g2plot';

@Component({
  selector: 'wpx-admin-chart-mem',
  template: ` <div style="display: inline-block" [ngStyle]="{height,width}" #ref></div> `
})
export class MemComponent implements AfterViewInit, OnDestroy {
  @Input() height?: string;
  @Input() width?: string;
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Liquid;

  ngAfterViewInit(): void {
    this.chart = new Liquid(this.ref.nativeElement, {
      percent: 0.26,
      autoFit: true,
      outline: {
        border: 4,
        distance: 8
      },
      wave: {
        length: 128
      },
      statistic: {
        title: {
          content: '内存状态'
        }
      }
    });
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
