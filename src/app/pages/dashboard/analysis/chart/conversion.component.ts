import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Area } from '@antv/g2plot';

import { conversion } from '../data';
import { timer } from 'rxjs';

@Component({
  selector: 'app-analysis-charts-conversion',
  template: ` <div #ref> </div>`
})
export class ConversionComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Area;

  ngAfterViewInit(): void {
    this.chart = new Area(this.ref.nativeElement, {
      data: conversion,
      height: 215,
      xField: 'date',
      yField: 'value',
      seriesField: 'type',
      slider: {
        start: 0.1,
        end: 0.9
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
