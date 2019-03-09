import {
  AfterContentInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
  ViewEncapsulation,
  ViewRef
} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'bit-form-explain',
  templateUrl: './bit-form-explain.component.html',
  styleUrls: ['./bit-form-explain.component.scss'],
})
export class BitFormExplainComponent implements OnInit {
  @Input() name: string;
  @Input() form: FormGroup;
  @Input() async = false;
  @Input() explain: string[][] = [];

  @ViewChild('NzFormExplain') NzFormExplain: TemplateRef<any>;

  constructor(private viewContainerRef: ViewContainerRef) {

  }

  ngOnInit(): void {
    // this.viewContainerRef.createEmbeddedView(this.NzFormExplain);
  }

  formExplainError() {
    return this.async ?
      this.form.get(this.name).dirty && this.form.get(this.name).errors || this.form.get(this.name).pending :
      this.form.get(this.name).dirty && this.form.get(this.name).errors;
  }
}
