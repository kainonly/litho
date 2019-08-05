import {Directive, Input, OnInit} from '@angular/core';
import {NzFormLabelComponent} from 'ng-zorro-antd';
import {ConfigService} from '../base/config.service';

@Directive({
  selector: '[bitFormLabelCol]'
})
export class BitFormLabelColDirective implements OnInit {
  private col: any;
  @Input() bitFormLabelCol: string;

  constructor(
    private nzFormLabelComponent: NzFormLabelComponent,
    private configService: ConfigService
  ) {
  }

  ngOnInit() {
    if (this.bitFormLabelCol !== undefined && this.configService.formControlCol.hasOwnProperty(this.bitFormLabelCol)) {
      this.col = this.configService.formLabelCol[this.bitFormLabelCol];
    } else {
      this.col = this.configService.formLabelCol.common;
    }

    this.nzFormLabelComponent.nzXs = this.col.hasOwnProperty('nzXs') ? this.col.nzXs : null;
    this.nzFormLabelComponent.nzSm = this.col.hasOwnProperty('nzSm') ? this.col.nzSm : null;
    this.nzFormLabelComponent.nzMd = this.col.hasOwnProperty('nzMd') ? this.col.nzMd : null;
    this.nzFormLabelComponent.nzLg = this.col.hasOwnProperty('nzLg') ? this.col.nzLg : null;
    this.nzFormLabelComponent.nzXl = this.col.hasOwnProperty('nzXl') ? this.col.nzXl : null;
    this.nzFormLabelComponent.nzXXl = this.col.hasOwnProperty('nzXXl') ? this.col.nzXXl : null;
    this.nzFormLabelComponent.setClassMap();
  }
}
