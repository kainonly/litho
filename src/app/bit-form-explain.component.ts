import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';

@Component({
  selector: 'bit-form-explain',
  templateUrl: './bit-form-explain.component.html'
})
export class BitFormExplainComponent implements OnInit {
  @Input() name: string;
  @Input() form: FormGroup;
  @Input() async = false;
  @Input() explain: { [key: string]: string }[] = [];

  explainLists = [];

  ngOnInit() {
    this.explainLists = [];
    for (const i in this.explain) {


    }
    this.explainLists = this.explain.map(v => {
      return v;
    });
    console.log(this.explain);
  }

  formExplainError() {
    return this.async ?
      this.form.get(this.name).dirty && this.form.get(this.name).errors || this.form.get(this.name).pending :
      this.form.get(this.name).dirty && this.form.get(this.name).errors;
  }
}
