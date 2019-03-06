import {Directive, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[bitSearch]'
})
export class BitSearchDirective implements OnInit {
  @Input() bitSearch: string;

  constructor() {
  }

  ngOnInit() {
    console.log(this.bitSearch);
  }
}
