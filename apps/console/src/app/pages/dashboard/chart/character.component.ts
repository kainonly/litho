import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { timer } from 'rxjs';

import { Rose } from '@antv/g2plot';

@Component({
  selector: 'app-analysis-chart-character',
  template: `<div #ref></div>`
})
export class CharacterComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Rose;

  ngAfterViewInit(): void {
    this.chart = new Rose(this.ref.nativeElement, {
      data: [
        { type: '20~29岁', value: 27 },
        { type: '30~39岁', value: 25 },
        { type: '40~49岁', value: 18 },
        { type: '50~59岁', value: 15 },
        { type: '60~69岁', value: 10 },
        { type: '其他', value: 5 }
      ],
      xField: 'type',
      yField: 'value',
      seriesField: 'type',
      radius: 0.9,
      legend: {
        title: {
          text: '受众群体年龄特征'
        },
        position: 'bottom'
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
