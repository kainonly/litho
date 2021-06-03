import { AfterViewInit, Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { BitRouterService } from '../bit-router.service';

@Component({
  selector: 'bit-header',
  templateUrl: './bit-header.component.html'
})
export class BitHeaderComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input() subTitle: any;
  @Input() back: boolean;
  @ViewChild('banner') banner: TemplateRef<any>;
  @ViewChild('actions') actions: TemplateRef<any>;

  constructor(
    private router: BitRouterService
  ) {
  }

  ngOnInit(): void {
    this.router.subTitle = this.subTitle;
    this.router.back = this.back !== undefined;
  }

  ngAfterViewInit(): void {
    this.router.banner = this.banner;
    this.router.actions = this.actions;
    this.router.changed.next(true);
  }

  ngOnDestroy(): void {
    this.router.banner = undefined;
    this.router.actions = undefined;
    this.router.back = false;
    this.router.subTitle = undefined;
  }
}
