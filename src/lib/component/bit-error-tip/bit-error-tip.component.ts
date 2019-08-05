import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';

@Component({
  selector: 'bit-error-tip',
  templateUrl: './bit-error-tip.component.html'
})
export class BitErrorTipComponent implements OnInit {
  @Input() hasError: any = {};
  @ViewChild('ref', {static: true}) ref: TemplateRef<any>;
  errorLists: any[] = [];

  ngOnInit() {
    for (const key in this.hasError) {
      if (this.hasError.hasOwnProperty(key)) {
        this.errorLists.push({
          key,
          error: this.hasError[key]
        });
      }
    }
    console.log(this.errorLists);
  }
}
