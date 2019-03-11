import {Directive, HostListener} from '@angular/core';
import {Location} from '@angular/common';

@Directive({
  selector: '[bitBack]'
})
export class BitBackDirective {

  constructor(private location: Location) {
  }

  @HostListener('click')
  onClick() {
    this.location.back();
  }
}
