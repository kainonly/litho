import { Component, OnInit } from '@angular/core';

import { DynamicService } from '../dynamic.service';

@Component({
  selector: 'wpx-dynamic-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
  constructor(public dynamic: DynamicService) {}

  ngOnInit(): void {
    const schema = this.dynamic.page?.schema;
    console.log(schema);
  }
}
