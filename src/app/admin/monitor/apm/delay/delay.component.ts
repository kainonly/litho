import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

import { Mix } from '@antv/g2plot';

@Component({
  selector: 'app-admin-monitor-apm-delpay',
  template: `<div style="height: 300px" #ref></div>`
})
export class DelayComponent implements AfterViewInit {
  @ViewChild('ref') ref!: ElementRef;

  private plot?: Mix;

  ngAfterViewInit(): void {
    this.plot = new Mix(this.ref.nativeElement, {
      height: 140,
      appendPadding: [20, 0, 0, 0],
      tooltip: false
    });
  }
}
