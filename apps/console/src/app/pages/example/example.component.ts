import { Component, Input, OnInit } from '@angular/core';

import { Page } from '@weplanx/common';
import { AnyDto } from '@weplanx/ng';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html'
})
export class ExampleComponent implements OnInit {
  /**
   * 载入数据
   */
  @Input() page!: AnyDto<Page>;

  ngOnInit(): void {
    console.log(this.page);
  }
}
