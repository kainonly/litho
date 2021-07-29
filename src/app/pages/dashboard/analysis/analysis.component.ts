import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Bar, Pie, WordCloud } from '@antv/g2plot';

import { keyword } from './data';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html'
})
export class AnalysisComponent implements AfterViewInit {
  @ViewChild('salesTypeChart') salesTypeChart!: ElementRef;

  salesChannel = 0;
  hots = [
    { keyword: '搜索关键词-A', users: 176, increase: 0.28 },
    { keyword: '搜索关键词-B', users: 556, increase: -0.68 },
    { keyword: '搜索关键词-C', users: 904, increase: 0.8 },
    { keyword: '搜索关键词-D', users: 254, increase: 0.9 },
    { keyword: '搜索关键词-E', users: 246, increase: 0.42 }
  ];
  statisticsIndex = 0;

  ngAfterViewInit(): void {
    this.drawSalesTypeChart();
  }

  private drawSalesTypeChart(): void {
    new Bar(this.salesTypeChart.nativeElement, {
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
    }).render();
  }
}
