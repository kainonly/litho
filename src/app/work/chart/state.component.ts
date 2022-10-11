import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Heatmap } from '@antv/g2plot';

@Component({
  selector: 'app-work-state',
  template: `<div #ref></div>`
})
export class StateComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Heatmap;

  async ngAfterViewInit(): Promise<void> {
    const res = await fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/github-commit.json');
    const data = await res.json();
    this.chart = new Heatmap(this.ref.nativeElement, {
      data,
      height: 200,
      xField: 'week',
      yField: 'day',
      colorField: 'commits',
      reflect: 'y',
      shape: 'boundary-polygon',
      meta: {
        day: {
          type: 'cat',
          values: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
        },
        week: {
          type: 'cat'
        },
        commits: {
          sync: true
        },
        date: {
          type: 'cat'
        }
      },
      yAxis: {
        grid: null
      },
      tooltip: {
        title: 'date',
        showMarkers: false
      },
      interactions: [{ type: 'element-active' }],
      xAxis: {
        position: 'top',
        tickLine: null,
        line: null,
        label: {
          offset: 12,
          style: {
            fontSize: 12,
            fill: '#666',
            textBaseline: 'top'
          },
          formatter: val => {
            if (val === '2') {
              return 'MAY';
            } else if (val === '6') {
              return 'JUN';
            } else if (val === '10') {
              return 'JUL';
            } else if (val === '15') {
              return 'AUG';
            } else if (val === '19') {
              return 'SEP';
            } else if (val === '24') {
              return 'OCT';
            }
            return '';
          }
        }
      }
    });
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
