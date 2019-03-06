import {Directive, Input} from '@angular/core';
import {NzFormControlComponent} from 'ng-zorro-antd';
import {ConfigService} from '../base/config.service';

@Directive({
  selector: '[bitFormControlCol]'
})
export class BitFormControlColDirective {
  @Input() bitFormControlCol: string;

  constructor(nzFormControlComponent: NzFormControlComponent,
              configService: ConfigService) {
    nzFormControlComponent.ngOnInit = () => {
      const col = !this.bitFormControlCol && configService.formLabelCol.hasOwnProperty(this.bitFormControlCol) ?
        configService.formLabelCol.common : configService.formLabelCol[this.bitFormControlCol];

      nzFormControlComponent.nzXs = col.hasOwnProperty('nzXs') ? col.nzXs : null;
      nzFormControlComponent.nzSm = col.hasOwnProperty('nzSm') ? col.nzSm : null;
      nzFormControlComponent.nzMd = col.hasOwnProperty('nzMd') ? col.nzMd : null;
      nzFormControlComponent.nzLg = col.hasOwnProperty('nzLg') ? col.nzLg : null;
      nzFormControlComponent.nzXl = col.hasOwnProperty('nzXl') ? col.nzXl : null;
      nzFormControlComponent.nzXXl = col.hasOwnProperty('nzXXl') ? col.nzXXl : null;
      nzFormControlComponent.setClassMap();
    };
  }
}
