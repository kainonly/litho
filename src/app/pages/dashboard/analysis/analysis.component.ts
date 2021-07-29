import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Area, Column, Radar } from '@antv/g2plot';
import { conversion } from './data';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html'
})
export class AnalysisComponent implements AfterViewInit {
  @ViewChild('effectChart') effectChart!: ElementRef;
  @ViewChild('conversionChart') conversionChart!: ElementRef;
  @ViewChild('salesTrend') salesTrend!: ElementRef;

  ngAfterViewInit(): void {
    this.drawEffectChart();
    this.drawConversionChart();
    this.drawSalesTrendChart();
  }

  private drawEffectChart(): void {
    new Radar(this.effectChart.nativeElement, {
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
    }).render();
  }

  private drawConversionChart(): void {
    new Area(this.conversionChart.nativeElement, {
      data: conversion,
      height: 215,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      slider: {
        start: 0.1,
        end: 0.9
      }
    }).render();
  }

  private drawSalesTrendChart(): void {
    new Column(this.salesTrend.nativeElement, {
      height: 360,
      data: [
        { m: '1月', value: 336 },
        { m: '2月', value: 501 },
        { m: '3月', value: 608 },
        { m: '4月', value: 803 },
        { m: '5月', value: 476 },
        { m: '6月', value: 1037 },
        { m: '7月', value: 238 },
        { m: '8月', value: 401 },
        { m: '9月', value: 844 },
        { m: '10月', value: 781 },
        { m: '11月', value: 1132 },
        { m: '12月', value: 1017 }
      ],
      xField: 'm',
      yField: 'value'
    }).render();
  }
}
