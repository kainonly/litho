import {Directive, HostListener, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {BitService} from '../base/bit.service';
import {NzTooltipDirective} from 'ng-zorro-antd';
import {FormArray, FormControl, FormControlDirective, FormControlName, FormGroup, NgModel} from '@angular/forms';
import {Subscription} from 'rxjs';

@Directive({
  selector: '[bitI18nTips]',
})
export class BitI18nTipsDirective implements OnInit, OnDestroy {
  private valueChanges: Subscription;

  @Input() bitI18nTips: string;

  constructor(private bit: BitService,
              private formControlName: FormControlName,
              private nzTooltipDirective: NzTooltipDirective) {
    nzTooltipDirective.nzTrigger = 'focus';
    nzTooltipDirective.nzPlacement = 'topLeft';
  }

  ngOnInit() {
    this.valueChanges = this.formControlName.valueChanges.subscribe(() => {
      if (this.bit.i18nTips.hasOwnProperty(this.bitI18nTips)) {
        // this.nzTooltipDirective.nzOverlayStyle = {
        //   display: this.bit.i18nTips[this.bitI18nTips].length !== 0 ? 'block' : 'none'
        // };

        const tips = [];
        for (const x of this.bit.i18nTips[this.bitI18nTips]) {
          tips.push(this.bit.l[this.bitI18nTips + '_' + x]);
        }

        this.nzTooltipDirective.nzTitle = tips.join(',');
      }
    });
  }

  ngOnDestroy() {
    this.valueChanges.unsubscribe();
  }

}
