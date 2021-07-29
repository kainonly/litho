import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Area, Bar, Column, Pie, Radar, Rose, WordCloud, Sankey } from '@antv/g2plot';

import { conversion, keyword, sales } from './data';

@Component({
  selector: 'app-dashboard-analysis',
  templateUrl: './analysis.component.html'
})
export class AnalysisComponent implements AfterViewInit {
  @ViewChild('effectChart') effectChart!: ElementRef;
  @ViewChild('conversionChart') conversionChart!: ElementRef;
  @ViewChild('salesTrendChart') salesTrendChart!: ElementRef;
  @ViewChild('characterChart') characterChart!: ElementRef;
  @ViewChild('keywordChart') keywordChart!: ElementRef;
  @ViewChild('salesPerChart') salesPerChart!: ElementRef;
  @ViewChild('salesTypeChart') salesTypeChart!: ElementRef;
  @ViewChild('targetChart') targetChart!: ElementRef;

  salesChannel = 0;
  hots = [
    { keyword: '搜索关键词-A', users: 176, increase: 0.28 },
    { keyword: '搜索关键词-B', users: 556, increase: -0.68 },
    { keyword: '搜索关键词-C', users: 904, increase: 0.8 },
    { keyword: '搜索关键词-D', users: 254, increase: 0.9 },
    { keyword: '搜索关键词-E', users: 246, increase: 0.42 }
  ];
  statisticsIndex = 0;

  private targetSankey!: Sankey;

  ngAfterViewInit(): void {
    this.drawEffectChart();
    this.drawConversionChart();
    this.drawSalesTrendChart();
    this.drawCharacterChart();
    this.drawKeywordChart();
    this.drawSalesPerChart();
    this.drawSalesTypeChart();
    this.drawTargetChart();
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
    new Column(this.salesTrendChart.nativeElement, {
      data: sales,
      xField: 'city',
      yField: 'value',
      seriesField: 'type',
      isGroup: true,
      columnStyle: {
        radius: [20, 20, 0, 0]
      }
    }).render();
  }

  private drawCharacterChart(): void {
    new Rose(this.characterChart.nativeElement, {
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
    }).render();
  }

  private drawKeywordChart(): void {
    new WordCloud(this.keywordChart.nativeElement, {
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
    }).render();
  }

  private drawSalesPerChart(): void {
    new Pie(this.salesPerChart.nativeElement, {
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
    }).render();
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

  reRender() {
    if (this.statisticsIndex === 0) {
      this.targetSankey.render();
    }
    if (this.statisticsIndex === 1) {
      this.targetSankey.destroy();
    }
  }

  private drawTargetChart(): void {
    this.targetSankey = new Sankey(this.targetChart.nativeElement, {
      data: [
        { source: '首次打开', target: '首页 UV', value: 160 },
        { source: '结果页', target: '首页 UV', value: 40 },
        { source: '验证页', target: '首页 UV', value: 10 },
        { source: '我的', target: '首页 UV', value: 10 },
        { source: '朋友', target: '首页 UV', value: 8 },
        { source: '其他来源', target: '首页 UV', value: 27 },
        { source: '首页 UV', target: '服务 A', value: 30 },
        { source: '首页 UV', target: '扫一扫', value: 40 },
        { source: '首页 UV', target: '服务 B', value: 35 },
        { source: '首页 UV', target: '服务 C', value: 25 },
        { source: '首页 UV', target: '服务 E', value: 10 },
        { source: '首页 UV', target: '服务 D', value: 30 },
        { source: '首页 UV', target: '服务 H', value: 40 },
        { source: '首页 UV', target: '其他流向', value: 45 }
      ],
      sourceField: 'source',
      targetField: 'target',
      weightField: 'value',
      nodeWidthRatio: 0.008,
      nodePaddingRatio: 0.03
    });
    this.targetSankey.render();
  }
}
