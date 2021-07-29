import { Directive, OnInit, TemplateRef } from '@angular/core';

import { AppService } from '@common/app.service';

@Directive({
  selector: '[appExtra]'
})
export class ExtraDirective implements OnInit {
  constructor(private ref: TemplateRef<any>, private app: AppService) {}

  ngOnInit(): void {
    this.app.extra = this.ref;
  }
}
