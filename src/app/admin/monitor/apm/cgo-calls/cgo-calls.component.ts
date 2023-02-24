import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { Area } from '@antv/g2plot';

import { MonitorService } from '../../monitor.service';

@Component({
  selector: 'app-admin-monitor-apm-cgo-calls',
  template: `<div style="height: 300px" #ref></div>`
})
export class CgoCallsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('ref') ref!: ElementRef;

  private plot?: Area;

  constructor(private monitor: MonitorService) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // this.monitor.getCgoCalls().subscribe(data => {
    //   console.log(data);
    // });
    // this.plot = new Area(this.ref.nativeElement, {
    //   height: 140,
    // });
  }

  ngOnDestroy(): void {
    this.plot?.destroy();
  }
}
