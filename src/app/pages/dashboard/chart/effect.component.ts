import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

import { Radar } from '@antv/g2plot';

@Component({
  selector: 'app-analysis-chart-effect',
  template: `<div #ref></div>`
})
export class EffectComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Radar;

  ngAfterViewInit(): void {
    this.chart = new Radar(this.ref.nativeElement, {
      data: [
        { name: 'A 模式', sale: 10371 },
        { name: 'B 模式', sale: 7380 },
        { name: 'C 模式', sale: 7414 },
        { name: 'D 模式', sale: 2140 },
        { name: 'E 模式', sale: 660 }
      ],
      xField: 'name',
      yField: 'sale',
      limitInPlot: false,
      height: 240,
      width: 240,
      meta: {
        sale: {
          alias: '销售量',
          min: 0,
          nice: true
        }
      },
      area: {}
    });
    timer(200).subscribe(() => {
      this.chart.render();
    });
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
