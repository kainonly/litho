import {Directive} from '@angular/core';
import {NzTooltipDirective} from 'ng-zorro-antd';

@Directive({
  selector: '[bitI18nTipsStyle]'
})
export class BitI18nTipsStyleDirective {
  constructor(
    private nzTooltipDirective: NzTooltipDirective
  ) {
    nzTooltipDirective.nzPlacement = 'topLeft';
    nzTooltipDirective.nzTrigger = 'focus';
  }
}
