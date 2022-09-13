import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

import { DualAxes } from '@antv/g2plot';

@Component({
  selector: 'app-analysis-chart-timeline',
  template: `<div #ref></div>`
})
export class TimelineComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: DualAxes;

  ngAfterViewInit(): void {
    this.chart = new DualAxes(this.ref.nativeElement, {
      data: [
        [
          { time: '2019-03', value: 350, type: 'uv' },
          { time: '2019-04', value: 900, type: 'uv' },
          { time: '2019-05', value: 300, type: 'uv' },
          { time: '2019-06', value: 450, type: 'uv' },
          { time: '2019-07', value: 470, type: 'uv' },
          { time: '2019-03', value: 220, type: 'bill' },
          { time: '2019-04', value: 300, type: 'bill' },
          { time: '2019-05', value: 250, type: 'bill' },
          { time: '2019-06', value: 220, type: 'bill' },
          { time: '2019-07', value: 362, type: 'bill' }
        ],
        [
          { time: '2019-03', count: 800, name: 'a' },
          { time: '2019-04', count: 600, name: 'a' },
          { time: '2019-05', count: 400, name: 'a' },
          { time: '2019-06', count: 380, name: 'a' },
          { time: '2019-07', count: 220, name: 'a' },
          { time: '2019-03', count: 750, name: 'b' },
          { time: '2019-04', count: 650, name: 'b' },
          { time: '2019-05', count: 450, name: 'b' },
          { time: '2019-06', count: 400, name: 'b' },
          { time: '2019-07', count: 320, name: 'b' },
          { time: '2019-03', count: 900, name: 'c' },
          { time: '2019-04', count: 600, name: 'c' },
          { time: '2019-05', count: 450, name: 'c' },
          { time: '2019-06', count: 300, name: 'c' },
          { time: '2019-07', count: 200, name: 'c' }
        ]
      ],
      xField: 'time',
      yField: ['value', 'count'],
      geometryOptions: [
        {
          geometry: 'line',
          seriesField: 'type',
          lineStyle: {
            lineWidth: 3,
            lineDash: [5, 5]
          },
          smooth: true
        },
        {
          geometry: 'line',
          seriesField: 'name',
          point: {}
        }
      ]
    });
    timer(200).subscribe(() => {
      this.chart.render();
    });
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
