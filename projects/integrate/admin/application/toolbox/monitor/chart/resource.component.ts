import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';

import { Liquid } from '@antv/g2plot';

@Component({
  selector: 'wpx-admin-monitor-resource',
  template: `<div style="height: 300px" #ref></div>`
})
export class ResourceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private chart!: Liquid;

  ngAfterViewInit(): void {
    this.chart = new Liquid(this.ref.nativeElement, {
      percent: 0.25,
      outline: {
        border: 4,
        distance: 8
      },
      wave: {
        length: 128
      }
    });
    this.chart.render();
  }

  ngOnDestroy(): void {
    this.chart.destroy();
  }
}
