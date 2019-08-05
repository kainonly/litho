import {Directive, Input, OnInit} from '@angular/core';
import {NzFormControlComponent} from 'ng-zorro-antd';
import {ConfigService} from '../base/config.service';

@Directive({
  selector: '[bitFormControlCol]'
})
export class BitFormControlColDirective implements OnInit {
  private col: any;
  @Input() bitFormControlCol: string;

  constructor(
    private nzFormControlComponent: NzFormControlComponent,
    private configService: ConfigService
  ) {
  }

  ngOnInit() {
    if (this.bitFormControlCol !== undefined && this.configService.formControlCol.hasOwnProperty(this.bitFormControlCol)) {
      this.col = this.configService.formControlCol[this.bitFormControlCol];
    } else {
      this.col = this.configService.formControlCol.common;
    }

    this.nzFormControlComponent.nzXs = this.col.hasOwnProperty('nzXs') ? this.col.nzXs : null;
    this.nzFormControlComponent.nzSm = this.col.hasOwnProperty('nzSm') ? this.col.nzSm : null;
    this.nzFormControlComponent.nzMd = this.col.hasOwnProperty('nzMd') ? this.col.nzMd : null;
    this.nzFormControlComponent.nzLg = this.col.hasOwnProperty('nzLg') ? this.col.nzLg : null;
    this.nzFormControlComponent.nzXl = this.col.hasOwnProperty('nzXl') ? this.col.nzXl : null;
    this.nzFormControlComponent.nzXXl = this.col.hasOwnProperty('nzXXl') ? this.col.nzXXl : null;
    this.nzFormControlComponent.setClassMap();
  }
}
