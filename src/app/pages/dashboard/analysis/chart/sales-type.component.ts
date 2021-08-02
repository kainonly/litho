import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Bar } from '@antv/g2plot';
import { timer } from 'rxjs';

@Component({
  selector: 'app-analysis-chart-sales-type',
  template: `<div #ref></div>`
})
export class SalesTypeComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Bar;

  ngAfterViewInit(): void {
    this.chart = new Bar(this.ref.nativeElement, {
      data: [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 }
      ],
      xField: 'value',
      yField: 'type',
      seriesField: 'type',
      legend: {
        position: 'top-left'
      }
    });
    timer(200).subscribe(() => {
      this.chart.render();
    });
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
