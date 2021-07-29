import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { WordCloud } from '@antv/g2plot';

import { keyword } from '../data';

@Component({
  selector: 'app-analysis-chart-keyword',
  template: `<div #ref></div>`
})
export class KeywordComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: WordCloud;

  ngAfterViewInit(): void {
    this.chart = new WordCloud(this.ref.nativeElement, {
      data: keyword,
      wordField: 'name',
      weightField: 'value',
      colorField: 'name',
      wordStyle: {
        fontFamily: 'Verdana',
        fontSize: [8, 32],
        rotation: 0
      },
      random: () => 0.5
    });
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
