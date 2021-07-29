import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Column } from '@antv/g2plot';

import { sales } from '../data';

@Component({
  selector: 'app-analysis-charts-sales-trend',
  template: ` <div #ref> </div>`
})
export class SalesTrendComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Column;

  ngAfterViewInit(): void {
    this.chart = new Column(this.ref.nativeElement, {
      data: sales,
      xField: 'city',
      yField: 'value',
      seriesField: 'type',
      isGroup: true,
      columnStyle: {
        radius: [20, 20, 0, 0]
      }
    });
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
