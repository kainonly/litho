import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Pie } from '@antv/g2plot';
import { timer } from 'rxjs';

@Component({
  selector: 'app-analysis-chart-sales-per',
  template: `<div #ref></div>`
})
export class SalesPerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Pie;

  ngAfterViewInit(): void {
    this.chart = new Pie(this.ref.nativeElement, {
      appendPadding: 10,
      data: [
        { type: '分类一', value: 27 },
        { type: '分类二', value: 25 },
        { type: '分类三', value: 18 },
        { type: '分类四', value: 15 },
        { type: '分类五', value: 10 },
        { type: '其他', value: 5 }
      ],
      angleField: 'value',
      colorField: 'type',
      radius: 0.75,
      label: {
        type: 'spider',
        labelHeight: 28,
        content: '{name}\n{percentage}'
      },
      interactions: [{ type: 'element-selected' }, { type: 'element-active' }]
    });
    timer(200).subscribe(() => {
      this.chart.render();
    });
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
