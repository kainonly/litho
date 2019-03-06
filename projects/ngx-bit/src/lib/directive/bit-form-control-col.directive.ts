import {Directive, Input} from '@angular/core';
import {NzFormControlComponent} from 'ng-zorro-antd';

@Directive({
  selector: '[bitFormControlCol]'
})
export class BitFormControlColDirective {
  @Input() bitFormControlCol: string;

  constructor(private nzFormControlComponent: NzFormControlComponent) {
    nzFormControlComponent.ngOnInit = () => {
      nzFormControlComponent.nzXs = 6;
      nzFormControlComponent.nzSm = 6;
      nzFormControlComponent.nzMd = 6;
      nzFormControlComponent.nzLg = 6;
      nzFormControlComponent.nzXl = 6;
      nzFormControlComponent.nzXXl = 6;
      nzFormControlComponent.setClassMap();
    };
  }
}
