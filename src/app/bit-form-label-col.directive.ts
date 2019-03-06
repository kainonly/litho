import {Directive} from '@angular/core';
import {NzFormLabelComponent} from 'ng-zorro-antd';

@Directive({
  selector: '[bitFormLabelCol]'
})
export class BitFormLabelColDirective {
  constructor(private nzFormLabelComponent: NzFormLabelComponent) {
    nzFormLabelComponent.ngOnInit = () => {
      nzFormLabelComponent.nzXs = 6;
      nzFormLabelComponent.nzSm = 6;
      nzFormLabelComponent.nzMd = 6;
      nzFormLabelComponent.nzLg = 6;
      nzFormLabelComponent.nzXl = 6;
      nzFormLabelComponent.nzXXl = 6;
      nzFormLabelComponent.setClassMap();
    };
  }
}
