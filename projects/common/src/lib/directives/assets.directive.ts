import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

import { WpxService } from '@weplanx/common';

@Directive({
  selector: '[wpxAssets]'
})
export class WpxAssetsDirective implements OnInit {
  @Input() wpxAssets!: string[];

  constructor(private wpx: WpxService, private renderer2: Renderer2, private ref: ElementRef) {}

  ngOnInit(): void {
    this.renderer2.setAttribute(this.ref.nativeElement, 'src', [this.wpx.assets, ...this.wpxAssets].join('/'));
  }
}
