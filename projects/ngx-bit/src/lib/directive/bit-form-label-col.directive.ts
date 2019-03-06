import {Directive, Input} from '@angular/core';
import {NzFormLabelComponent} from 'ng-zorro-antd';
import {ConfigService} from '../base/config.service';

@Directive({
  selector: '[bitFormLabelCol]'
})
export class BitFormLabelColDirective {
  @Input() bitFormLabelCol: string;

  constructor(nzFormLabelComponent: NzFormLabelComponent,
              configService: ConfigService) {
    nzFormLabelComponent.ngOnInit = () => {
      const col = !this.bitFormLabelCol && configService.formLabelCol.hasOwnProperty(this.bitFormLabelCol) ?
        configService.formLabelCol.common : configService.formLabelCol[this.bitFormLabelCol];

      nzFormLabelComponent.nzXs = col.hasOwnProperty('nzXs') ? col.nzXs : null;
      nzFormLabelComponent.nzSm = col.hasOwnProperty('nzSm') ? col.nzSm : null;
      nzFormLabelComponent.nzMd = col.hasOwnProperty('nzMd') ? col.nzMd : null;
      nzFormLabelComponent.nzLg = col.hasOwnProperty('nzLg') ? col.nzLg : null;
      nzFormLabelComponent.nzXl = col.hasOwnProperty('nzXl') ? col.nzXl : null;
      nzFormLabelComponent.nzXXl = col.hasOwnProperty('nzXXl') ? col.nzXXl : null;
      nzFormLabelComponent.setClassMap();
    };
  }
}
