import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import { Dataset } from '@common/models/dataset';
import { DatasetsService } from '@common/services/datasets.service';
import { WpxItems } from '@weplanx/ng';
import { NzCardComponent } from 'ng-zorro-antd/card';

@Component({
  selector: 'app-admin-datasets',
  templateUrl: './datasets.component.html'
})
export class DatasetsComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(NzCardComponent, { read: ElementRef, static: true }) card!: ElementRef;

  items = new WpxItems<Dataset>('name');
  y = '0px';

  private resizeObserver!: ResizeObserver;

  constructor(private datasets: DatasetsService) {}

  ngOnInit(): void {
    this.getData();
    this.resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const { height } = entry.contentRect;
        this.y = height - 180 + 'px';
      }
    });
  }

  ngAfterViewInit(): void {
    this.resizeObserver.observe(this.card.nativeElement);
  }

  ngOnDestroy(): void {
    this.resizeObserver.disconnect();
  }

  getData(): void {
    this.datasets.lists(this.items.searchText).subscribe(data => {
      this.items.data = [...data];
    });
  }

  clearSearch(): void {
    this.items.searchText = '';
    this.getData();
  }
}
