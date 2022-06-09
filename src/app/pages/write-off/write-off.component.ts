import { Component, Input, OnInit } from '@angular/core';

import { AnyDto, Page } from '@weplanx/ng';

@Component({
  selector: 'app-write-off',
  templateUrl: './write-off.component.html'
})
export class WriteOffComponent implements OnInit {
  @Input() page!: AnyDto<Page>;

  ngOnInit(): void {
    console.log(this.page);
  }
}
