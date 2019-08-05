import {Directive, Input, OnDestroy, TemplateRef, ViewContainerRef} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {Subscription} from 'rxjs';
import {BitExplainArgs} from '../types/bit-explain-args';

@Directive({
  selector: '[bitExplain]',
})
export class BitExplainDirective implements OnDestroy {
  private control: AbstractControl;
  private async: boolean;

  private statusChanges: Subscription;
  private error: any;
  private pending = false;
  private sign: string;

  constructor(
    private viewContainerRef: ViewContainerRef,
    private templateRef: TemplateRef<any>
  ) {
  }

  @Input()
  set bitExplain(args: BitExplainArgs) {
    this.control = args.form.get(args.name);
    this.async = (args.async) ? args.async : false;
    this.statusChanges = this.control.statusChanges.subscribe(status => {
      if (status === 'PENDING') {
        if (!this.pending) {
          if (this.viewContainerRef.length !== 0) {
            this.viewContainerRef.clear();
          }
          this.pending = true;
          this.error = (args.explain.pending) ? args.explain.pending : '';
          this.viewContainerRef.createEmbeddedView(this.templateRef, {
            $implicit: this.error
          });
        }
      } else {
        if (this.pending) {
          this.pending = false;
          this.viewContainerRef.clear();
        }
        if (this.control.dirty && this.control.errors) {
          for (const sign in args.explain) {
            if (args.explain.hasOwnProperty(sign) && this.control.hasError(sign)) {
              if (this.sign !== sign) {
                this.viewContainerRef.clear();
                this.sign = sign;
                this.error = args.explain[sign];
                this.viewContainerRef.createEmbeddedView(this.templateRef, {
                  $implicit: this.error
                });
              }
              break;
            }
          }
        } else {
          this.sign = null;
          this.viewContainerRef.clear();
        }
      }
    });
  }

  ngOnDestroy() {
    this.statusChanges.unsubscribe();
  }
}
