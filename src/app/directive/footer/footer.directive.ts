import { Directive, OnInit, TemplateRef } from '@angular/core';

import { AppService } from '@common/app.service';

@Directive({
  selector: '[appFooter]'
})
export class FooterDirective implements OnInit {
  constructor(private ref: TemplateRef<any>, private app: AppService) {}

  ngOnInit(): void {
    this.app.footer = this.ref;
  }
}
